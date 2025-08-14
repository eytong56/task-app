import { useState, useEffect } from "react";
import dates from "../constants/dates";
import Warning from "./Warning";

function Header({ selectedDate }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const initialTimeout = setTimeout(() => {
      setCurrentTime(new Date());

      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
      return clearInterval(timer);
    }, secondsUntilNextMinute * 1000);

    return () => clearTimeout(initialTimeout);
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
        <Warning>
          Currently viewing{" "}
          <span className="font-bold">
            {formatDate(selectedDate)}, {selectedDate.getFullYear()}
          </span>
        </Warning>
      )}
    </div>
  );
}

export default Header;
