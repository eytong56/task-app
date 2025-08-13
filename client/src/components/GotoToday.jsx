function GotoToday( { setSelectedDate }) {
  const handleClick = () => {
    setSelectedDate(new Date());
  }
  return (
    <button onClick={handleClick} className="cursor-pointer">
      Go to Today
    </button>
  )
}

export default GotoToday;