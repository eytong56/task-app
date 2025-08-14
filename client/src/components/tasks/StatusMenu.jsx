import STATUSES from "../../constants/statuses";
import { Circle, Triangle, Check, ArrowRight } from "lucide-react";

const iconColors = {
  "pending": "text-gray-500",
  "in-progress": "text-amber-500",
  "completed": "text-emerald-500",
  "pushed": "text-blue-500",
};

const hoverIconColors = {
  "pending": "hover:text-gray-500",
  "in-progress": "hover:text-amber-500",
  "completed": "hover:text-emerald-500",
  "pushed": "hover:text-blue-500",
};

function StatusMenu({ status, handleChangeStatus, updating }) {
  const getIconStyles = (iconStatus) => {
    let styles = "cursor-pointer transition-all duration-300 ";
    if (status === iconStatus) {
      return styles + iconColors[iconStatus];
    } else {
      return (
        styles +
        `text-neutral-200 ${hoverIconColors[iconStatus]} hover:opacity-30`
      );
    }
  };

  return (
    <div className="flex gap-1">
      <Circle
        onClick={!updating ? handleChangeStatus(STATUSES.PENDING) : undefined}
        className={getIconStyles(STATUSES.PENDING)}
      />
      <Triangle
        onClick={
          !updating ? handleChangeStatus(STATUSES.IN_PROGRESS) : undefined
        }
        className={getIconStyles(STATUSES.IN_PROGRESS)}
      />
      <Check
        onClick={!updating ? handleChangeStatus(STATUSES.COMPLETED) : undefined}
        className={getIconStyles(STATUSES.COMPLETED)}
      />
      <ArrowRight
        onClick={!updating ? handleChangeStatus(STATUSES.PUSHED) : undefined}
        className={getIconStyles(STATUSES.PUSHED)}
      />
    </div>
  );
}

export default StatusMenu;
