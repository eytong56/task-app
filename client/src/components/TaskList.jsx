import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

function TaskList({ selectedDate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading Tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  const taskItems = data.map((task) => {
    return <TaskItem key={task.id} task={task} />;
  });
  return <div>{taskItems}</div>;
}

export default TaskList;
