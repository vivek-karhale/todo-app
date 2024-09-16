import React, { useEffect, useState } from 'react'
import { fetchToDoList, Todo } from '../services/items';

const ToDoList = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const [currPage, setCurrPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    const loadTodo = async () => {
      setLoading(true);
      try {
        const tasks = await fetchToDoList(currPage, limit);
        setItems(tasks);
      } catch (error) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    loadTodo();
  },[currPage, limit]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='list-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody style={{ height: `${40*limit}px` }}>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    You have reached the end of the list.
                  </td>
                </tr>
              ) : (
                items.map(task => (
                  <tr key={task.id} >
                    <td>{task.id}</td>
                    <td>{task.userId}</td>
                    <td>{task.title}</td>
                    <td>{task.completed ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div>
            <button onClick={() => setCurrPage(prev => prev - 1)} disabled={currPage === 1}>
              Previous
            </button>
            <button onClick={() => setCurrPage(prev => prev + 1)} disabled={items.length === 0}>
              Next
            </button>
          </div>
        </div>
      ) }
    </div>
  )
}

export default ToDoList

