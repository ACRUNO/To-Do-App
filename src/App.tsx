import { Typography } from '@mui/material';
import './App.css';
import TodoList from './components/TodoList/todoList';

function App() {
  return (
    <div className='App'>
      <Typography variant='h3' fontWeight='light' display='flex' justifyContent='center' paddingTop='2rem'>
        To Do Appa
      </Typography>
      <TodoList />
    </div>
  );
}

export default App;
