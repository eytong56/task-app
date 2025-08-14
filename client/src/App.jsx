import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Arrow from "./components/Arrow";
import JumpToToday from "./components/JumpToToday";

function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2025-05-25T07:00:00Z")
  );

  return (
    <div className="relative">
      <div className="absolute left-0">
        <Arrow
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          direction={-1}
        />
      </div>
      <div className="absolute right-0">
        <Arrow
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          direction={1}
        />
      </div>
      <div className="absolute bottom-0">
        <JumpToToday setSelectedDate={setSelectedDate} />
      </div>
      <div className="flex flex-col items-center w-200 mx-auto mt-12 gap-10 py-12 px-12">
        <Header selectedDate={selectedDate} />
        <TaskList selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default App;
