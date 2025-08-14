import {formatDate} from "../../utils/dateUtils";

function TodayDate() {
  return (
    <h2 className="text-xl font-semibold text-center tracking-tight mb-4">
      <span className="font-normal">Today is </span>
      {formatDate(new Date())}
    </h2>
  );
}

export default TodayDate;
