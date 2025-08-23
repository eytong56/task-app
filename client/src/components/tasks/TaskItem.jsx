import { useState } from "react";
import TaskItemContainer from "./TaskItemContainer";
import StatusMenu from "./StatusMenu";
import STATUSES from "../../constants/statuses";
import { X } from "lucide-react";
import apiCall from "../../utils/api";

function TaskItem({ task, onTaskDeleted }) {
  // console.log('TaskItem rendering for task:', task.id);
  const [latestTask, setLatestTask] = useState(task);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await apiCall(`/tasks/${task.id}`, { method: "DELETE" });
      if (!response) {
        throw new Error(`Failed to delete task! Status: ${response.status}`);
      }
      const _ = await response.json();
      // console.log(deletedTask);
      if (onTaskDeleted) {
        onTaskDeleted(); // Refresh all tasks
      }
    } catch (error) {
      console.log(`Error deleting task: ${error}`);
      setError(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateTitle = async () => {
    // Don't update task title if empty or same as before
    if (!title.trim() || title.trim() === latestTask.title) {
      setTitle(latestTask.title); // Return to original title
      return;
    }
    try {
      setUpdating(true);
      const response = await apiCall(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title.trim(),
        }),
      });
      if (!response) {
        throw new Error(
          `Failed to update task title! Status: ${response.status}`
        );
      }
      const updatedTask = await response.json();
      // console.log(updatedTask);
      setLatestTask(updatedTask);
      setTitle(updatedTask.title);
    } catch (error) {
      console.log(`Error updating task: ${error}`);
      setError(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleChangeStatus = (newStatus) => async () => {
    // Don't update task status if same as before
    if (newStatus === latestTask.status) {
      return;
    }
    try {
      setUpdating(true);
      setStatus(newStatus); // For immediate client-side response
      const response = await apiCall(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      if (!response) {
        throw new Error(
          `Failed to update task status! Status: ${response.status}`
        );
      }
      const updatedTask = await response.json();
      // console.log(updatedTask);
      setLatestTask(updatedTask);
    } catch (error) {
      setStatus(latestTask.status); // Reverse the status change to be consistent with database
      console.log(`Error updating task: ${error}`);
      setError(error);
    } finally {
      setUpdating(false);
    }
  };

  const titleStyles =
    status === STATUSES.COMPLETED
      ? " text-neutral-400 line-through"
      : status === STATUSES.PUSHED
      ? " text-neutral-400"
      : "";

  if (deleting) {
    return (
      <TaskItemContainer>
        <span className="text-neutral-300">Deleting...</span>
      </TaskItemContainer>
    );
  }
  if (error)
    return (
      <div className="flex items-center text-xl font-medium text-red-800">
        Error: {error}
      </div>
    );

  return (
    <TaskItemContainer>
      <StatusMenu
        status={status}
        handleChangeStatus={handleChangeStatus}
        updating={updating}
      />
      <div className="grow">
        <input
          type="text"
          value={title}
          onChange={!updating ? handleChangeTitle : undefined}
          onBlur={!updating ? handleUpdateTitle : undefined}
          onKeyDown={!updating ? handleKeyDown : undefined}
          className={
            "focus:outline-none w-full transition-all duration-300" +
            titleStyles
          }
        />
      </div>
      <X
        onClick={!updating ? handleDelete : undefined}
        className="justify-self-end w-4 h-4 cursor-pointer hover:text-neutral-400 transition-colors duration-300"
      />
    </TaskItemContainer>
  );
}

export default TaskItem;
