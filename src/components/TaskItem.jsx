function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span
        style={{
          flex: 1,
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>

      <button onClick={() => deleteTask(task.id)}>Xóa</button>
    </li>
  );
}

export default TaskItem;
