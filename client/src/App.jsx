import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Arrow from "./components/Arrow";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-03-25T12:00:00Z"));

  return (
    <div>
      <Header selectedDate={selectedDate} />
      <TaskList selectedDate={selectedDate} />
      <Arrow selectedDate={selectedDate} setSelectedDate={setSelectedDate} direction={-1} />
      <Arrow selectedDate={selectedDate} setSelectedDate={setSelectedDate} direction={1} />
    </div>
  );
}

export default App;
