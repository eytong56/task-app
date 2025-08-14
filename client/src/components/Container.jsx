import Header from "./header/Header.jsx";
import TaskList from "./tasks/TaskList.jsx";

function Container({ selectedDate, setSelectedDate }) {
  return (
    <div className="flex-grow flex flex-col items-center max-w-200 min-w-150 gap-10 py-24 px-24">
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TaskList selectedDate={selectedDate} />
    </div>
  );
}

export default Container;
