import { useState } from "react";

function NewTaskItem({ selectedDate, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log("NewTaskItem rendering, title:", title);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      // Don't add empty task
      return;
    }

    try {
      setIsSubmitting(true);
      const selectedDateQuery = selectedDate.toISOString().split("T")[0];
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          date: selectedDateQuery,
        }),
      });
      if (!response) {
        throw new Error("Failed to create new task");
      }
      const newTask = await response.json();
      console.log(newTask)
      setTitle("");
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.log(`Error creating new task: ${error}`);
      // TODO: Show error to client
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="cursor-pointer"
        disabled={isSubmitting || !title.trim()}
      >
        {isSubmitting ? "Adding..." : "+"}
      </button>
    </form>
  );
}

export default NewTaskItem;
