import { useState } from "react";
import Container from "./components/Container";
import ArrowNav from "./components/ArrowNav";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex justify-center">
      <ArrowNav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        direction={-1}
      />
      <Container
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ArrowNav
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        direction={1}
      />
    </div>
  );
}

export default App;
