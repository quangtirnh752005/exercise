import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  // Lần đầu: lấy dữ liệu đã lưu, nếu chưa có thì dùng giá trị ban đầu
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  // Mỗi khi value thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
