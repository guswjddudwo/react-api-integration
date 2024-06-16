import { instance } from "../helpers/axios/instance";

export const getTodos = async () => {
  const response = await instance.get("todos");
  return response;
};
