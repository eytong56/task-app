function JumpToToday( { setSelectedDate }) {
  const handleClick = () => {
    setSelectedDate(new Date());
  }
  return (
    <button onClick={handleClick} className="cursor-pointer">
      Jump to Today
    </button>
  )
}

export default JumpToToday;