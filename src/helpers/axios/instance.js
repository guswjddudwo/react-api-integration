import axios from "axios";
export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 30000, //여기까지가 기본옵션
});
