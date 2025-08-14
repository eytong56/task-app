import { useState, useEffect } from "react";

function Time() {
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

  return (
    <h1 className="text-5xl font-bold text-center mb-6">
      {currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </h1>
  );
}

export default Time;
