import logo from "./logo.svg";
import "./App.css";
import { getTodos } from "./apis/todos";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const setAsyncTodos = async () => {
      const result = await getTodos();
      setTodos(result.data);
    };
    setAsyncTodos();
  }, []);
  return (
    <ul>
      {todos.map((todo) => (
        <li>
          <h2>{todo.title}</h2>
          <span>{todo.completed}</span>
        </li>
      ))}
    </ul>
  );
}

export default App;

// true completed 완료  , 완료 미완료 구분하기 모양은 상관없음
// false completed 미완료
// 리스트를 클릭했을때 리스트ID로 페이지를 넘기는거
// 주소는 todos/1
