import { formatDateYear } from "../../utils/dateUtils";
import JumpToToday from "./JumpToToday";
import { CircleAlert } from "lucide-react";

function Warning({ selectedDate, setSelectedDate }) {
  const past = selectedDate < new Date(); // selectedDate is in past
  
  const classes = past
    ? "text-red-900 bg-red-200 ring-red-100"
    : "text-indigo-900 bg-indigo-200 ring-indigo-100";

  return (
    <div className="flex flex-col items-center gap-3">
      <h3
        className={
          "text-light text-center px-5 py-2 rounded-full ring-1 " + classes
        }
      >
        <CircleAlert className="inline align-middle" /> Currently viewing{" "}
        <span className="font-bold">
          {formatDateYear(selectedDate)}
        </span>
      </h3>
      <JumpToToday
        past={past}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}

export default Warning;
