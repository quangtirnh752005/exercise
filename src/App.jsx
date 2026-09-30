import { useContext, useMemo, useState } from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialTasks } from "./datas/tasks";

function TaskManager() {
  const { darkMode } = useContext(ThemeContext);

  // Danh sách công việc (tự lưu vào localStorage)
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);

  // Bộ lọc: "all" | "pending" | "done"
  const [filter, setFilter] = useState("all");

  // Từ khóa tìm kiếm
  const [search, setSearch] = useState("");

  // Thêm công việc
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  // Đánh dấu hoàn thành / chưa hoàn thành
  const toggleTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasks(newTasks);
  };

  // Xóa công việc (chỉ được xóa khi đã hoàn thành)
  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    if (taskToDelete && !taskToDelete.completed) {
      window.alert(
        `Không thể xóa "${taskToDelete.title}" vì công việc chưa hoàn thành!`,
      );
      return;
    }

    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);

    if (taskToDelete) {
      window.alert(`Xóa "${taskToDelete.title}" thành công!`);
    }
  };

  // Đếm số công việc hoàn thành
  const doneCount = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  // Lọc danh sách theo bộ lọc và từ khóa
  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === "pending") {
      result = result.filter((task) => !task.completed);
    }

    if (filter === "done") {
      result = result.filter((task) => task.completed);
    }

    result = result.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    );

    return result;
  }, [tasks, filter, search]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 16px",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Header />

        <TaskForm addTask={addTask} />

        {/* Bộ lọc + tìm kiếm */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "16px 20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="pending">Chưa làm</option>
            <option value="done">Hoàn thành</option>
          </select>

          <input
            type="text"
            value={search}
            placeholder="Tìm kiếm..."
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
        </div>

        {/* Thống kê */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #ccc" }}>
          Tổng: {tasks.length} | Chưa làm: {tasks.length - doneCount} | Hoàn
          thành: {doneCount}
        </div>

        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TaskManager />
    </ThemeProvider>
  );
}

export default App;
