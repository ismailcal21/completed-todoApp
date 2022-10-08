import React, { useEffect, useState } from "react";
function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");
  const [editted, setEditted] = useState(false);

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");

    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);
  // const changeIsDone = (id) => {
  //   const searchedTodo = todos.find((item) => item.id === id);
  //   const updatedTodo = {
  //     ...searchedTodo,
  //     isDone: !searchedTodo.isDone,
  //   };
  //   const filteredTodos = todos.filter((item) => item.id !== id);
  //   setTodos([updatedTodo, ...filteredTodos]);
  //   console.log(filteredTodos);
  // };
  // const editTodo = (id) => {
  //   console.log(id);
  //   setIsEdit(true);
  //   const searchedTodo = todos.find((item) => item.id === id);
  //   setTodoText(searchedTodo.text);
  // };
  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem(
      "todos",
      JSON.stringify([updatedTodo, ...filteredTodos])
    );
  };
  const deleteTodos = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([filteredTodos]);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("Ypu have the todos already");
      return;
    }
    if (isEdit === true) {
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([updatedTodo, ...filteredTodos]);
      localStorage.setItem(
        "todos",
        JSON.stringify([...updatedTodo, filteredTodos])
      );
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
      setEditted(true);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };
      setTodos([newTodo, ...todos]);
      localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]));
      setTodoText("");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            type="text"
            className="form-control"
            placeholder="Type your todo"
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button
            className={`btn btn-${isEdit === true ? "success" : "primary"}`}
            type="submit"
            id="button-addon2"
          >
            {isEdit === true ? "Save " : "Add"}
          </button>
        </div>
      </form>
      {todos.length <= 0 ? (
        <p className="text-center">You dont have any todo ye.</p>
      ) : (
        <>
          {todos.map((item) => (
            <div
              className={`alert alert-${
                item.isDone === true ? "success" : "secondary"
              } d-flex justify-content-between align-items-center`}
              role="alert"
            >
              <p>{item.text}</p>
              <div>
                <button
                  className="btn btn-sm btn-primary mx-1"
                  onClick={() => {
                    setIsEdit(true);
                    setWillUpdateTodo(item.id);
                    setTodoText(item.text);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodos(item.id)}
                  className="btn btn-sm btn-danger mx-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => changeIsDone(item.id)}
                  className="btn btn-sm btn-success"
                >
                  {item.isDone === false ? "Done" : "Undone"}
                </button>
              </div>
            </div>
          ))}
        </>
        // <div>
        //   {todos.map((item) => (
        //     <div class="alert alert-secondary d-flex justify-content-between" role="alert">
        //      <p>{item.text}</p>

        //      <button onClick={()=> changeIsdone(item.id)}
        //      className="btn btn-sm btn-secondary"
        //      >
        //       {item.isDone === false ? "Done": "Undone"}
        //      </button>
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
}

export default App;
