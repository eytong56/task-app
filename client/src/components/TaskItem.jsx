import { useState } from "react";
import STATUSES from "../constants/statuses";
import { Circle, Triangle, Check, ArrowRight, X } from "lucide-react";

function TaskItem({ task, onTaskDeleted }) {
  // console.log('TaskItem rendering for task:', task.id);
  const [latestTask, setLatestTask] = useState(task);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        throw new Error("Failed to delete task");
      }
      const deletedTask = await response.json();
      console.log(deletedTask);
      if (onTaskDeleted) {
        onTaskDeleted();
      }
    } catch (error) {
      console.log(`Error deleting task: ${error}`);
      setError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpdateTitle = async () => {
    // if (isUpdating) {
    //   return;
    // }
    if (!title.trim() || title.trim() === latestTask.title) {
      // Don't update task if empty or same as before
      setTitle(latestTask.title);
      return;
    }

    try {
      setIsUpdating(true);
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
        }),
      });
      if (!response) {
        throw new Error("Failed to update task title");
      }
      const updatedTask = await response.json();
      console.log(updatedTask);
      setLatestTask(updatedTask);
      setTitle(updatedTask.title);
    } catch (error) {
      console.log(`Error updating task: ${error}`);
      setError(error);
      // TODO: Show error to client
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleChangeStatus = (newStatus) => async () => {
    // if (isUpdating) {
    //   return;
    // }
    try {
      setIsUpdating(true);
      setStatus(newStatus);
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      if (!response) {
        throw new Error("Failed to update task status");
      }
      const updatedTask = await response.json();
      console.log(updatedTask);
      setLatestTask(updatedTask);
    } catch (error) {
      setStatus(latestTask.status); // If error, reverse the status to be consistent with db
      console.log(`Error updating task: ${error}`);
      setError(error);
      // TODO: Show error to client
    } finally {
      setIsUpdating(false);
    }
  };

  const setIconColor = (iconStatus) => {
    return (
      "cursor-pointer transition-all duration-300 " +
      (status !== iconStatus ? "text-neutral-200 " : "")
    );
  };

  return (
    <div className="flex w-full justify-start items-center gap-6 px-6 py-3 border-1 border-neutral-300 rounded-full bg-white hover:shadow-sm focus:shadow-sm focus-within:border-neutral-500 transition-all duration-300">
      <div className="flex gap-1">
        <Circle
          onClick={handleChangeStatus(STATUSES.PENDING)}
          className={setIconColor(STATUSES.PENDING) + " text-gray-500"}
          disabled={isUpdating}
        />
        <Triangle
          onClick={handleChangeStatus(STATUSES.IN_PROGRESS)}
          className={setIconColor(STATUSES.IN_PROGRESS) + "text-amber-500"}
          disabled={isUpdating}
        />
        <Check
          onClick={handleChangeStatus(STATUSES.COMPLETED)}
          className={setIconColor(STATUSES.COMPLETED) + "text-emerald-500"}
          disabled={isUpdating}
        />
        <ArrowRight
          onClick={handleChangeStatus(STATUSES.PUSHED)}
          className={setIconColor(STATUSES.PUSHED) + "text-blue-500"}
          disabled={isUpdating}
        />
      </div>
      <div className="grow">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onBlur={handleUpdateTitle}
          onKeyDown={handleKeyDown}
          className="focus:outline-none w-full"
        />
      </div>
      <X
        onClick={handleDelete}
        disabled={isDeleting}
        className="justify-self-end w-4 h-4 cursor-pointer hover:text-neutral-400 transition-colors duration-300"
      />
    </div>
  );
}

export default TaskItem;
