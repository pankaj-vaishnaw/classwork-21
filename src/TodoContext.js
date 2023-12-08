// TodoContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  todos: [], // Array to store todo items
  theme: 'light', // 'light' or 'dark'
};

// Create the context
const TodoContext = createContext();

// Create the TodoProvider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create the useTodoContext hook for accessing the context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

// Reducer function to handle state updates
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    // Add other cases for todo actions (e.g., ADD_TODO, UPDATE_TODO, DELETE_TODO)
    default:
      return state;
  }
};
