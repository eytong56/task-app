import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import NewTaskItem from "./NewTaskItem";

function TaskList({ selectedDate }) {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve tasks for selectedDate (initial)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const selectedDateString = selectedDate.toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:3000/tasks?date=${selectedDateString}`
        );
        if (!response.ok) {
          throw new Error(`Failed to retrieve tasks! Status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedDate]);

  // Refresh tasks (for when tasks are updated)
  const refreshTasks = async () => {
    try {
      setLoading(true);
      const selectedDateQuery = selectedDate.toISOString().split("T")[0];
      const response = await fetch(
        `http://localhost:3000/tasks?date=${selectedDateQuery}`
      );
      if (!response.ok) {
          throw new Error(`Failed to refresh tasks! Status: ${response.status}`);
        }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center text-xl font-medium text-neutral-400">
        Loading Tasks...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center text-xl font-medium text-red-800">
        Error: {error}
      </div>
    );

  const taskItems = tasks.map((task) => {
    return <TaskItem key={task.id} task={task} onTaskDeleted={refreshTasks} />;
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      {taskItems}
      <NewTaskItem selectedDate={selectedDate} onTaskAdded={refreshTasks} />
    </div>
  );
}

export default TaskList;
