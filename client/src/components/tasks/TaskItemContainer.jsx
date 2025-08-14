function TaskItemContainer({ children }) {
  return (
    <div className="flex w-full justify-start items-center gap-6 px-6 py-3 border-1 border-neutral-300 rounded-full bg-white hover:shadow-sm focus:shadow-sm focus-within:border-neutral-500 transition-all duration-300">
      {children}
    </div>
  );
}

export default TaskItemContainer;
