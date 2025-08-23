import Time from "./Time";
import TodayDate from "./TodayDate";
import Warning from "./Warning";
import { motion, AnimatePresence } from "motion/react";

function Header({ selectedDate, setSelectedDate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Time />
      <TodayDate />
      <AnimatePresence>
        {new Date().toDateString() !== selectedDate.toDateString() && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            key="warning"
          >
            <Warning
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Header;
