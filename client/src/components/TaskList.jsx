import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import NewTaskItem from "./NewTaskItem";

function TaskList({ selectedDate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("TaskList rendering, data:", data);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const selectedDateQuery = selectedDate.toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:3000/tasks?date=${selectedDateQuery}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  const refreshTasks = async () => {
    try {
      setLoading(true);
      const selectedDateQuery = selectedDate.toISOString().split("T")[0];
      const response = await fetch(
        `http://localhost:3000/tasks?date=${selectedDateQuery}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  const taskItems = data.map((task) => {
    return <TaskItem key={task.id} task={task} onTaskDeleted={refreshTasks}/>;
  });
  return (
    <div className="flex flex-col gap-3 w-full">
      {taskItems}
      <NewTaskItem selectedDate={selectedDate} onTaskAdded={refreshTasks}/>
    </div>
  );
}

export default TaskList;
