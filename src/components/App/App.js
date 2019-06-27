import React from "react";
import "./App.css";

import Counter from "../Counter/Counter";

const initialState = {
  user: {
    firstname: "Rossano",
    lastname: "D'Angelo",
    email: "rossano.dangelo@yahoo.com"
  },
  todos: [
    { id: Date.now(), description: "Learn about React", completed: false },
    {
      id: Date.now() + 1,
      description: "Listen some music",
      completed: true
    },
    { id: Date.now() + 2, description: "Debug the code", completed: false },
    { id: Date.now() + 3, description: "Dream", completed: true }
  ]
};

class App extends React.Component {
  // You can avoid using the constructor
  // if your component doesn't receive any props
  // It's enough declare state = initialState;
  // and it's done. Try it out.
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleToggle = id => {
    const oldTodos = [...this.state.todos];
    const todos = oldTodos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({
      todos
    });
  };
  handleSubmit = event => {
    // Basic form handling
    event.preventDefault(); // To prevent the page reloading
    if (event.target["todo-description"].value === "") return; // Prevent empty todo description
    const value = event.target["todo-description"].value;
    const todo = {
      id: Date.now(),
      description: value,
      completed: false
    };
    let todos = [...this.state.todos, todo];
    this.setState({
      todos
    });
    event.target["todo-description"].value = ""; // Reset the input field
  };
  handleDelete = id => {
    // Another pattern to update the state
    this.setState(state => {
      const todos = state.todos.filter(todo => todo.id !== id);
      return {
        todos
      };
    });
  };
  render() {
    // Remember: JSX isn't HTML
    // You're using React APIs like React.createElement(...);
    // Decomment these lines and open your browser console
    // const element = <p>Hello!</p>;
    // const anotherElement = React.createElement("p", null, "Hello!");
    // console.log('JSX', element);
    // console.log('Without JSX', anotherElement);
    return (
      <div className="App">
        <div className="Header">
          <h1>
            Hello, {this.state.user.firstname} {this.state.user.lastname}!
          </h1>
          <p>Schedule your days!</p>
        </div>
        <div className="Container">
          <ul>
            {this.state.todos.map(todo => (
              <li key={todo.id}>
                {todo.description}
                {todo.completed ? (
                  <small className="Completed">Completed</small>
                ) : (
                  <small className="Todo">Todo</small>
                )}
                <button
                  className="Delete"
                  onClick={() => this.handleDelete(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="Toggle"
                  onClick={() => this.handleToggle(todo.id)}
                >
                  Toggle
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input className="Input-Item" type="text" name="todo-description" />
            <button className="Button-Item" type="submit">
              Add
            </button>
          </form>
          <Counter total={this.state.todos.length} />
        </div>
        <div className="Footer">
          <code>
            with
            <span role="img" aria-labelledby="love">
              ❤️
            </span>
            by codelab-react-introduction
          </code>
        </div>
      </div>
    );
  }
}

export default App;
