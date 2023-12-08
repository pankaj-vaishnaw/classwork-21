import React, { useState, createContext } from "react";

// Theme context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [theme, setTheme] = useState("light");

  const addTodo = (todo) => {
    setTodoList([...todoList, { id: Date.now(), text: todo }]);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { id, text } : todo))
    );
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <header>
          <h1>Todo List</h1>
          <button onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </header>
        <main>
          <input
            type="text"
            placeholder="Add a new todo..."
            onKeyDown={(e) => e.key === "Enter" && addTodo(e.target.value)}
          />
          <ul>
            {todoList.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                />
                <button onClick={() => removeTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default TodoApp;