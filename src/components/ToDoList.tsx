import React, { useEffect, useState, useRef } from 'react'
import { fetchToDoListByPage, Todo } from '../services/todoService';
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box , Pagination, TextField  } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ToDoList = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const totalPages = Math.ceil(200 / rowPerPage);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData(currPage, rowPerPage)
  },[currPage, rowPerPage]);

  const fetchData = async (currentPage: number, rowPerPage: number) => {
    setLoading(true);
    try {
      const data = await fetchToDoListByPage(currentPage, rowPerPage);
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrPage(value);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const cappedValue = Math.min(value, 40);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (cappedValue !== rowPerPage) {
        setRowPerPage(cappedValue);
        const newTotalPages = Math.ceil(200 / cappedValue);
        if (currPage > newTotalPages) {
          setCurrPage(newTotalPages);
        }
        
      }
    }, 300);
  };


  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper elevation={2} style={{ backgroundColor: theme.palette.secondary.main }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ID</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>User ID</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Title</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                You have reached the end of the list.
              </TableCell>
            </TableRow>
          ) : (
            items.map(task => (
              <TableRow key={task.id} >
                <TableCell style={{ textAlign: 'center' }}>{task.id}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{task.userId}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{task.completed ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
            count={totalPages}
            page={currPage}
            boundaryCount={isMobile ? 1 : 2}
            onChange={handlePageChange}
            color="primary"
          />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" marginTop={2} paddingBottom={2}>
        <Typography marginRight={4}>Rows per page: </Typography>
        <TextField
          type="number"
          size='small'
          value={rowPerPage}
          onChange={handleRowsPerPageChange}
          slotProps={{ htmlInput: { min: 5, step: 5 } }}
          style={{ width: 100, textAlign: 'center' }}
        />
      </Box>

    </Paper>
  )
}

export default ToDoList