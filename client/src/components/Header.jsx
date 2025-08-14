import { useState, useEffect } from "react";
import dates from "../constants/dates";
import Warning from "./Warning";
import JumpToToday from "./JumpToToday";

function Header({ selectedDate, setSelectedDate }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timer;

    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const initialTimeout = setTimeout(() => {
      setCurrentTime(new Date());

      timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
    }, secondsUntilNextMinute * 1000);

    return () => {
      clearTimeout(initialTimeout);
      timer && clearInterval(timer);
    };
  }, []);

  function formatDate(date) {
    return (
      <>
        {dates.DAYS_OF_WEEK[date.getDay()]}, {dates.MONTHS[date.getMonth()]}{" "}
        {date.getDate()}
      </>
    );
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-6">
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h1>
      <h2 className="text-xl font-semibold text-center tracking-tight mb-4">
        <span className="font-normal">Today is </span>
        {formatDate(new Date())}
      </h2>
      {new Date().toDateString() !== selectedDate.toDateString() && (
        <div className="flex flex-col items-center gap-3">
          <Warning past={selectedDate < new Date()}>
            Currently viewing{" "}
            <span className="font-bold">
              {formatDate(selectedDate)}, {selectedDate.getFullYear()}
            </span>
          </Warning>
          <JumpToToday
            past={selectedDate < new Date()}
            setSelectedDate={setSelectedDate}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
