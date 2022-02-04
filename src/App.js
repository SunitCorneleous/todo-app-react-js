import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const AddButtonHandler = (event) => {
    event.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, text: input })
          : { id: t.id, text: t.text }
      );

      setTodos(updatedTodos);
      setEditId(0);
      setInput("");

      return;
    }

    if(input !== ""){

      setTodos([{ id: `${input}-${Date.now()}`, text: input }, ...todos]);
      setInput("");
    }

  };

  const HandleDelete = (id) => {
    const allTodo = todos.filter((todo) => todo.id !== id);
    setTodos([...allTodo]);
  };

  const HandleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);

    setInput(editTodo.text);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>

        {/* input field and add button */}
        <form className="todoForm" onSubmit={AddButtonHandler}>
          <input
            type="text"
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
          <button type="submit" disabled={!input}>
            {editId ? "Edit" : "Add"}
          </button>
        </form>

        {/* Here is the todo lists */}
        <ul className="allTodos">
          {todos.map((todo) => (
            <li className="singleTodo">
              <span className="todoText" key={todo.id}>
                {todo.text}
              </span>
              <button onClick={() => HandleEdit(todo.id)}>Edit</button>
              <button onClick={() => HandleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
