import { useState } from "react";
import STATUSES from "../constants/statuses";

function TaskItem({ task, onTaskDeleted }) {
  // console.log('TaskItem rendering for task:', task.id);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      // TODO: Show error to client
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSwitchMode = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      // Don't update task to empty
      return;
    }

    try {
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
      setTitle(updatedTask.title);
    } catch (error) {
      console.log(`Error updating task: ${error}`);
      // TODO: Show error to client
    } finally {
      setIsEditing(false);
    }
  };

  const editTitleMode = (
    <form onSubmit={handleUpdateTitle}>
      <input type="text" value={title} onChange={handleChange} />
    </form>
  );

  const handleChangeStatus = (newStatus) => async () => {
    try {
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
      setStatus(updatedTask.status);
    } catch (error) {
      console.log(`Error updating task: ${error}`);
      // TODO: Show error to client
    } finally {
      //
    }
  };

  return (
    <div className="flex">
      <div>
        <span onClick={handleChangeStatus(STATUSES.PENDING)} className="cursor-pointer">P</span>
        <span onClick={handleChangeStatus(STATUSES.IN_PROGRESS)} className="cursor-pointer">IP</span>
        <span onClick={handleChangeStatus(STATUSES.COMPLETED)} className="cursor-pointer">C</span>
        <span onClick={handleChangeStatus(STATUSES.PUSHED)} className="cursor-pointer">{"->"}</span>
        {status}
      </div>
      {!isEditing ? (
        <div onClick={handleSwitchMode}>{title}</div>
      ) : (
        editTitleMode
      )}
      <div>{task.task_date}</div>
      <div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="cursor-pointer"
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
