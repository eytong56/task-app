import { ArrowUpRight } from "lucide-react";

function JumpToToday({ past, setSelectedDate }) {
  const handleClick = () => {
    setSelectedDate(new Date());
  };
  const verb = past ? "forward" : "back";
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer inline text-sm text-neutral-500 font-semibold underline underline-offset-4 hover:text-neutral-800 transition-colors duration-300"
    >
      Jump {verb} to today{" "}
      <ArrowUpRight className="inline w-5 h-5 align-bottom" />
    </div>
  );
}

export default JumpToToday;
