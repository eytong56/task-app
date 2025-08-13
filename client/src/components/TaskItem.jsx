function TaskItem({ task }) {
  return(<div className="flex">
    <div>
      {task.status}
    </div>
    <div>
      {task.title}
    </div>
    <div>
      {task.task_date}
    </div>
  </div>);
}

export default TaskItem;