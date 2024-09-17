import React from 'react';
import ToDoList from './components/ToDoList';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container >
        <CssBaseline />
        <Typography variant="h4" align="center" gutterBottom marginTop={4}>
          Todo List
        </Typography>
        <ToDoList />
      </Container>
    </ThemeProvider> 
  );
}

export default App;
