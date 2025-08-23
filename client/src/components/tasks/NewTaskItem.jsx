import { useState } from "react";
import TaskItemContainer from "./TaskItemContainer";

function NewTaskItem({ selectedDate, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTask = async () => {
    // Don't add task with empty title
    if (!title.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      const selectedDateString = selectedDate.toISOString().split("T")[0];
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          date: selectedDateString,
        }),
      });

      if (!response) {
        throw new Error("Failed to create new task");
      }

      const newTask = await response.json();
      console.log(newTask);

      setTitle(""); // Reset title
      // TODO: Add new task without refreshing
      if (onTaskAdded) {
        onTaskAdded(); // Refresh all tasks
      }
    } catch (error) {
      console.log(`Error creating new task: ${error}`);
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Allow submit on enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  if (submitting) {
    return (
      <TaskItemContainer>
        <span className="text-neutral-300">Adding...</span>
      </TaskItemContainer>
    );
  }

  if (error) {
    return (
      <TaskItemContainer>
        <span className="text-red-800">Error: {error}</span>
      </TaskItemContainer>
    );
  }

  return (
    <TaskItemContainer>
      <input
        type="text"
        value={title}
        placeholder="Add a new task..."
        onChange={handleChangeTitle}
        disabled={submitting}
        onBlur={handleAddTask}
        onKeyDown={handleKeyDown}
        className="focus:outline-none w-full"
      />
    </TaskItemContainer>
  );
}

export default NewTaskItem;
