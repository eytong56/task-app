import Time from "./Time";
import TodayDate from "./TodayDate"
import Warning from "./Warning";

function Header({ selectedDate, setSelectedDate }) {
  return (
    <div>
      <Time />
      <TodayDate />
      {new Date().toDateString() !== selectedDate.toDateString() && (
        <Warning selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      )}
    </div>
  );
}

export default Header;
