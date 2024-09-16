import axios from "axios";

const API_URL = process.env.REACT_APP_TODO_DATA_API_URL;

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchToDoList = async (page: number, limit : number) => {
  try {
    console.log(`${API_URL}?_page=${page}&_limit=${limit}`)
    const response = await  axios.get<Todo[]>(`${API_URL}?_page=${page}&_limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error('Network error');
  }
};