import { instance } from "../helpers/axios/instance";

export const getTodos = async () => {
  // 비동기 함수 선언
  const response = await instance.get("todos"); // 프라미스가 처리 될때까지 기다림
  return response; // 응답 객체를 반환
};
