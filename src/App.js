import logo from "./logo.svg";
import "./App.css";
import { getTodos } from "./apis/todos";
import { useEffect, useState } from "react";
import { ReactDOM } from "react";
import { Router } from "react-router-dom";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";

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
    <Router>
      <div>
        <ul>
          {todos.map((todo) => (
            <li>
              <Link Link to={`/todo/${todos.id}`}>
                {todo.title}
              </Link>
            </li>
          ))}
        </ul>
        <Route path="/" Component={TodoDetail} />
      </div>
    </Router>
  );
}

function TodoDetail({ mech }) {
  return <h2>todo ID: {mech.params.id}</h2>;
}

export default App;

// true completed 완료  , 완료 미완료 구분하기 모양은 상관없음
// false completed 미완료
// 리스트를 클릭했을때 리스트ID로 페이지를 넘기는거
// 주소는 todos/1
