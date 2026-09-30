import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Không cho thêm công việc rỗng
    if (title.trim() === "") {
      return;
    }

    addTask(title.trim());
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        padding: "20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <input
        type="text"
        value={title}
        placeholder="Nhập tên công việc..."
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: 1, padding: "10px", fontSize: "16px" }}
      />

      <button type="submit" style={{ padding: "10px 20px" }}>
        Thêm
      </button>
    </form>
  );
}

export default TaskForm;
