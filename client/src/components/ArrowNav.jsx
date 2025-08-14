import { ChevronLeft, ChevronRight } from "lucide-react";

function Arrow({ selectedDate, setSelectedDate, direction }) {
  const handleClick = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + direction);
    setSelectedDate(nextDay);
  };

  const classes = "w-8 h-8 cursor-pointer hover:text-neutral-400 transition-colors duration-300";
  let arrow;
  if (direction < 0) {
    arrow = <ChevronLeft onClick={handleClick} className={classes} />
  } else {
    arrow = <ChevronRight onClick={handleClick} className={classes} />
  }
  return (
    <div className="h-[50vh] flex items-end select-none">
      {arrow}
    </div>
  );
}

export default Arrow;
