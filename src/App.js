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
  // observer : 주체의 상태 변화를 감지하고 이에 따라 동작을 수행하는 객체
  // 뷰포트에 들어와 있는지 감지함! ! 스크롤 할때 알 수 있음
  const observer = useRef(new IntersectionObserver(observerCallback));

  useEffect(() => {
    const setAsyncTodos = async () => {
      const result = await getTodos();
      setTodos(result.data);
    };
    setAsyncTodos();
  }, []);

  // useEffect
  // useEffect(callbackFn,dependencies)
  // === useEffect(()=>{},[])
  // 의존성이 빈 배열이면([]) 처음 mount 시점에만 1번 실행

  // 의존성 배열에 state가 있는 경우, 해당 state가 변뎡되면 콜백함수 실행(updated)

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
