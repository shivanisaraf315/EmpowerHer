import axiosInstance from "./axiosInstance";

export async function getTodos() {
  const res = await axiosInstance.get("/todos");
  return res.data;
}

export async function getTodoById(id) {
  const res = await axiosInstance.get(`/todos/${id}`);
  return res.data;
}
