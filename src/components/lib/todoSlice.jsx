import { createSlice } from '@reduxjs/toolkit';

// Load state from localStorage
const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('todosState');
  return savedState ? JSON.parse(savedState) : { todos: [], groups: [], filter: '' };
};

// Save state to localStorage
const saveStateToLocalStorage = (state) => {
  localStorage.setItem('todosState', JSON.stringify(state));
};

const initialState = loadStateFromLocalStorage();

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveStateToLocalStorage(state);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        saveStateToLocalStorage(state);
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveStateToLocalStorage(state);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveStateToLocalStorage(state);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveStateToLocalStorage(state);
    },
    reorderTodo: (state, action) => {
      state.todos = action.payload; // The payload will be the reordered todos array
    },   
  },
});

export const { 
  addTodo, 
  updateTodo, 
  deleteTodo, 
  toggleTodo, 
  setFilter, 
  addGroup, 
  deleteGroup, 
  reorderTodo 
} = todoSlice.actions;

export default todoSlice.reducer;
