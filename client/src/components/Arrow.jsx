function Arrow({ selectedDate, setSelectedDate, direction }) {
  const handleClick = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + direction)
    setSelectedDate(nextDay);
  }

  return (
    <button onClick={handleClick} className="cursor-pointer">
      Move in {direction} direction
    </button>
  )
}

export default Arrow;
