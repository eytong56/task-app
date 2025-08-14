import { useState } from "react";
import { Plus } from "lucide-react";

function NewTaskItem({ selectedDate, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log("NewTaskItem rendering, title:", title);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTask = async () => {
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
      console.log(newTask);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div className="flex w-full justify-start items-center gap-6 px-6 py-3 border-1 border-neutral-300 rounded-full bg-white hover:shadow-sm focus:shadow-sm focus-within:border-neutral-500 transition-all duration-300">
      <input
        type="text"
        value={title}
        placeholder="Add a new task..."
        onChange={handleChange}
        disabled={isSubmitting}
        onBlur={handleAddTask}
        onKeyDown={handleKeyDown}
        className="focus:outline-none w-full"
      />
    </div>
  );
}

export default NewTaskItem;
