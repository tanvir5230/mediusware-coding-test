import React, { useReducer, useState } from "react";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let newState = [...state];
      newState.push(action.toAdd);
      return newState;
    case "ACTIVE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, status: "active" };
        }
      });
    default:
      return state;
  }
};

const initialTodos = [
  { id: 1, name: "task1", status: "active" },
  { id: 2, name: "task2", status: "completed" },
  { id: 3, name: "task3", status: "pending" },
];

const Problem1 = () => {
  const [todos, dispatch] = useReducer(taskReducer, initialTodos);
  const [task, setTask] = useState({
    id: 0,
    name: "",
    status: "",
  });
  const [show, setShow] = useState("all");

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldVal = e.target.value;
    if (fieldName === "name") {
      setTask({ ...task, name: fieldVal });
    } else if (fieldName === "status") {
      setTask({ ...task, status: fieldVal });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length > 0 && task.status.length > 0) {
      dispatch({ type: "ADD", toAdd: { ...task, id: todos.length + 1 } });
    } else {
      alert("you have to add a task name and status of the task. Try again!!!");
    }
  };

  const handleClick = (val) => {
    setShow(val);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "all" &&
                todos.map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td>{todo.name}</td>
                      <td>{todo.status}</td>
                    </tr>
                  );
                })}
              {show === "active" &&
                todos
                  .filter((todo) => todo.status === "active")
                  .map((todo) => {
                    return (
                      <tr key={todo.id}>
                        <td>{todo.name}</td>
                        <td>{todo.status}</td>
                      </tr>
                    );
                  })}
              {show === "completed" &&
                todos
                  .filter((todo) => todo.status === "completed")
                  .map((todo) => {
                    return (
                      <tr key={todo.id}>
                        <td>{todo.name}</td>
                        <td>{todo.status}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
