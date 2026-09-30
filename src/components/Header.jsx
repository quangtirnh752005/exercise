import { useContext } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "22px" }}>Mini Task Manager</h1>

      <button onClick={toggleTheme} style={{ padding: "8px 14px" }}>
        {darkMode ? (
          <>
            <CiLight /> Light
          </>
        ) : (
          <>
            <MdDarkMode /> Dark
          </>
        )}
      </button>
    </header>
  );
}

export default Header;
