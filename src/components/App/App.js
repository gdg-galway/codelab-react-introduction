import React from "react";
import axios from 'axios';

import "./App.css";

import Counter from "../Counter/Counter";

const initialState = {
  user: {
    firstname: "Rossano",
    lastname: "D'Angelo",
    email: "rossano.dangelo@yahoo.com"
  },
  todos: [
    { id: Date.now(), description: "In case of fire", completed: false },
    {
      id: Date.now() + 1,
      description: "git commit",
      completed: true
    },
    { id: Date.now() + 2, description: "git push", completed: false },
    { id: Date.now() + 3, description: "Leave the building", completed: true }
  ],
  externalTodos: [],
  posts: [],
  loading: false
};

class App extends React.Component {
  // You can avoid using the constructor
  // if your component doesn't receive any props
  // It's enough declare state = initialState;
  // and it's done. Try it out.
  constructor(props) {
    super(props);
    this.state = initialState;
    console.log('[App.js] - constructor');
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

  componentDidMount = () => {
    // This method is called as soon as the component is mounted and ready.
    // This is a good place to initiate API calls, if you need to load data from a remote endpoint.
    // You can update the components state within componentDidMound
    console.log('[App.js] - componentDidMount()');

    // Let's say we want to load more TODOs from an existing API
    // and we want to use this data
    // We need to store these external TODOs into the state
    this.setState({ loading: true });
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        console.log('[App.js] - JSON from the API', json);
        this.setState({ externalTodos: json });
        console.log('[App.js] - The application state', this.state);
        this.setState({ loading: false });
      });

    // Now we want to load the number of all posts we have in out blog
    // But this time we'll use 'axios'
    this.setState({ loading: true });
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(json => {
        // Here we can access the response object
        // config
        console.log('[App.js] - config', json.config);
        // headers
        console.log('[App.js] - headers', json.headers);
        // request
        console.log('[App.js] - request', json.request);
        // status
        console.log('[App.js] - status', json.status);
        // and data as well
        console.log('[App.js] - data', json.data);

        this.setState({ posts: json.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        // And we can easily handle errors like 404 Not Found or 500 Internal Server Error
        console.log('[App.js] - Something went wrong!', error);
      });

      // Far more powerful than fetch, isn't? :)
  }

  componentDidUpdate = (prevProps) => {
    // The most common use case for the componentDidUpdate() method is
    // updating the DOM in response to prop or state changes.
    // You can update the components state within componentDidMound
    console.log('[App.js] - componentDidMount()');
  }

  componentWillUnmount = (prevProps) => {
    // This methodis called just before the component is unmounted and destroyed.
    // If there are any cleanup actions that you would need to do, this would be the right spot.
    // You cannot update the components state within componentDidMound
    console.log('[App.js] - componentDidMount()');
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // This lifecycle can be handy sometimes when you don’t want React to
    // render your state or prop changes.
    // This method exists only for certain performance optimizations.
    console.log('[App.js] - shouldComponentUpdate()');
    // Returns true only if something actually change
    console.log('[App.js] - nextProps', nextProps);
    console.log('[App.js] - nextState', nextState);
    return nextProps !== nextState;
  }

  render() {
    // render() is a pure function
    // It means that this function does not have any side effects and
    // will always return the same output when the same inputs are passed
    // You cannot modify the component state within this method
    console.log('[App.js] - render()');

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
        { this.state.loading ? 
          <p>Loading external TODOs...</p> :
          <div>External TODOs: <Counter total={this.state.externalTodos.length} /></div>
        }
        <br />
        {this.state.loading ? (
          <p>Loading posts...</p>
        ) : (
          <div>
            Posts: <Counter total={this.state.posts.length} />
          </div>
        )}
        <div className="Footer">
          <code>
            with
            <span role="img" aria-labelledby="love">
              ❤️
            </span>
            by GDG Galway
          </code>
        </div>
      </div>
    );
  }
}

export default App;
