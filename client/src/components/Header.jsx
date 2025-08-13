import { useState, useEffect } from "react";
import dates from "../constants/dates";

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

  return (
    <div>
      <h1>
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h1>
      <h2>
        {dates.DAYS_OF_WEEK[selectedDate.getDay()]}, {dates.MONTHS[selectedDate.getMonth()]}{" "}
        {selectedDate.getDate()}
      </h2>
    </div>
  );
}

export default Header;
