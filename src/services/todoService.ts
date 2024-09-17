import axios from "axios";

const API_URL = process.env.REACT_APP_TODO_DATA_API_URL;

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchToDoListByPage = async (page: number = 1, limit : number = 10) => {
  try {
    const response = await  axios.get<Todo[]>(`${API_URL}?_page=${page}&_limit=${limit}`);
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Error fetching todo list: ${message}`);
  }
};