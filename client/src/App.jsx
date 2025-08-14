import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ArrowNav from "./components/ArrowNav";
import JumpToToday from "./components/JumpToToday";

function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date()
    // new Date("2025-05-25T07:00:00Z")
  );

  return (
    <div className="flex justify-center">
      <ArrowNav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        direction={-1}
      />
      <div className="flex-grow flex flex-col items-center max-w-200 min-w-150 gap-10 py-24 px-24">
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <TaskList selectedDate={selectedDate} />
      </div>
      <ArrowNav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        direction={1}
      />
    </div>
  );
}

export default App;
