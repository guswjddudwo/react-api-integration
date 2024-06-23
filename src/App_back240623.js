import logo from "./logo.svg";
import "./App.css";
import { getTodos } from "./apis/todos";
import { useEffect, useReducer, useRef, useState } from "react";
import { ReactDOM } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      target.style.opacity = entry.isIntersecting ? 1 : 0;
    });
  };

  const observer = useRef(new IntersectionObserver(observerCallback));

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
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} observer={observer.current} />
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

const TodoItem = ({ todo, observer }) => {
  const ref = useRef(null);

  useEffect(() => {
    observer.observe(ref.current);
  }, [observer]);
  return (
    <li ref={ref} style={{ transition: "opacity 1s" }}>
      <Link to={`/todo/${todo.id}`}>
        {todo.completed ? "완료" : "미완료"} - {todo.title}
      </Link>
    </li>
  );
};
