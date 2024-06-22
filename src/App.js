import logo from "./logo.svg";
import "./App.css";
import { getTodos } from "./apis/todos";
import { useEffect, useReducer, useState } from "react";
import { ReactDOM } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

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
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link Link to={`/todo/${todo.id}`}>
              {todo.completed ? "완료" : "미완료"} - {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TodoDetail() {
  const { id } = useParams();
  return <h2>todo ID: {id}</h2>;
}

export default App;

// completed가 trues는 완료,false는 미완료
// 모양은 상관없음
// 리스트를 클릭했을때 리스트ID로 페이지를 넘기기
// 주소는 todos/1
