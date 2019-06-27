<h1>Welcome to React Codelab 👋</h1>

Through this codelab we will develop a simple to-do application with React, learning the `basic concepts` of this library and some `ES6 features`.

## Initial setup
First of all, make sure you have **NodeJS** and **npm** installed on your machine.
Open your terminal and run `node --version` and `npm --version`: if everything is ok, you should see something like this
```bash
rossanos-mbp-2:codelab-react-introduction rossanodangelo$ node --version
v11.14.0
rossanos-mbp-2:codelab-react-introduction rossanodangelo$ npm --version
6.9.0
```
To easily scaffold the project I'm going to use `create-react-app`, a tool provided by Facebook.
```bash
npx create-react-app codelab-react-introduction
cd codelab-react-introduction
npm start
```
The `npm start` command will run your starter project to `http://localhost:3000/`.

## What's inside the box
Using your favourite text editor (I recommend **Visual Studio Code**), open the project to see the default structure:
```
./node_modules
./public
./src
App.js
App.test.js
App.css
.gitignore
package-lock.json
package.json
README.md
```
In this codelab we're going to work into the `./src` folder mainly but
if you want to learn more about it, [this is a good starting point](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

## Create your first component
Open `App.js` and overwrite the existing code with the following
```
import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>
            Hello, user!
          </h1>
        </div>
        <div className="Container">
          <p>To-do list here.</p>
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
```
Once refreshed you should display a very basic page with three sections: the `Header`, the `Container` and the `Footer`. **For now** let's go easy and leave them in the `App component`.

## The state
The `state` is a JavaScript object that defines how a component behaves. In this case we have to do with a to-do app so the application state contains... :scream_cat: to-dos!

Change `this.state` into the following object
```
this.state = {
  todos: [
    {
      id: Date.now(),
      description: "Learn about React",
      completed: false
    },
    {
      id: Date.now() + 1,
      description: "Listen some music",
      completed: true
    },
    {
      id: Date.now() + 2,
      description: "Debug the code",
      completed: false
    },
    {
      id: Date.now() + 3,
      description: "Dream",
      completed: true
    }
  ]
};
```
At this point we are ready to display our fake to-dos. Find the `render()` method and copy-paste this new `div` leaving unchanged the other `div`s
```
<div className="Container">
  {this.state.todos.map(todo => <p>{todo.description}</p>)}
</div>
```
Now you should see a list of `<p>` elements but there's a problem.. Open the browser console and you'll see the warning message
```
Warning: Each child in a list should have a unique "key" prop.

Check the render method of `App`. See https://fb.me/react-warning-keys for more information.
    in p (at App.js:80)
    in App (at src/index.js:7)
```
Mmmh..

![What?](https://media.giphy.com/media/xYHscQ1Np55i8/giphy.gif)

Don't worry, the fix is very straightforward. Do you about the **virtual DOM**? React renders things in a very smart way: it creates a copy of the real browser DOM - the virtual DOM - and every time your application changes (let's say) it *finds differences* between the virtual and the real DOM and updates **ONLY** the part is changed.

But it had some "limitations": this mechanism didn't work well for lists of similar elements. Imagine you have this
```
<ul>
  <li>...</li>
  <li>...</li>
  <li>...</li>
</ul>
```
Now let's say that we have a method to delete the second item of that list. But how can React know which element to delete?

The answer is **using a unique property** called `key`.
```
<div className="Container">
  {this.state.todos.map(todo => <p key={todo.id}>{todo.description}</p>)}
</div>
```
And this is the reason why I used `Date.now()`, `Date.now() + 1`, `Date.now() + 2` and `Date.now() + 3` as to-do identifiers. We need **unique** values.

If you want to learn more about this topic, [take a look to the official documentation](https://reactjs.org/docs/reconciliation.html).

## Restyling
Let's add some make-up. Open `App.css` and overwrite with the following
```
.App {
  text-align: center;
}

.Header {
  border-bottom: 1px black solid;
  padding: 10px 10px;
}

.Container {
  padding: 10px 50px;
}

.Container ul {
  list-style: none;
  padding: 0;
}

.Container ul li {
  border: 1px black solid;
  margin-bottom: 5px;
  padding: 15px;
}

.Footer {
  border-top: 1px black solid;
  padding: 10px 10px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
}

```
Now we can replace the `<p>` list with a real list, using the unordered list element.
```
<div className="Container">
  <ul>
    {this.state.todos.map(todo => (
      <li key={todo.id}>
        {todo.description}
      </li>
    ))}
  </ul>
</div>
```

## Conditional rendering
React makes quite easy performing conditional rendering: the most common "trick" is the `ternary operator`.
```
{ condition ? if true : if false }
```
We'd like to know when a to-do is completed or not without inspecting the webpage searching manually for the state :joy:
```
<ul>
  {this.state.todos.map(todo => (
    <li key={todo.id}>
      {todo.description}
      {todo.completed ? (
        <small className="Completed">Completed</small>
      ) : (
        <small className="Todo">Todo</small>
      )}
    </li>
  ))}
</ul>
```
> Use ( ... jsx code ... ) whe you have to split into multiple lines. Readability 

Paste this CSS into `App.css` (we take care about style here...)
```
.Completed {
  color: green;
}

.Todo {
  color: red;
}
```
Great! So now, according to the initial state we defined before, you should see two completed (and green flagged) to-dos and 2 not completed (and red flagged) to-dos.

You're rocking. Let's go ahead.

## Updating the state
As it'd great to see the status of each to-do, it'd great to change their status from the UI. We can quckly implement a `toggle` functionality, to change the status of a single to-do.
```
<ul>
  {this.state.todos.map(todo => (
    <li key={todo.id}>
      {todo.description}
      {todo.completed ? (
        <small className="Completed">Completed</small>
      ) : (
        <small className="Todo">Todo</small>
      )}
      <button className="Toggle" onClick={() => this.handleToggle(todo.id)}>
        Toggle
      </button>
    </li>
  ))}
</ul>
```
> Note how I'm using ( ) => this.handleToggle( ... )
> It does not mean that I'm executing the method when the click is performed.
> Use this pattern when you need to pass values as parameters for your handlers.

The related CSS
```
.Toggle  {
  float: right;
}
```
That button, once clicked, will execute a method called `handleToggle`.
```
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
```
This method expects an `id` as parameter and uses it to retrieve the single to-do we want to toggle. Its focal part though is
```
this.setState({
  todos
});
```
Here we are updating the application state in a **immutable way**. It's a common and well known best practice: when you're updating the application state (with React and/or with Redux) do it with immutability in mind.

This is a [good article](https://medium.com/tribalscale/understanding-immutability-fdd627b66e58) about this topic.

Now, if you try to toggle your to-dos, you should see some magic in action.

If you're in stuck with it, stop for a moment. Think about what we're doing and debug your application with [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) to see what's happening internally!

## Add the Counter component
Until now we never talked about `props` in details. We'll meet `props` working with a second component.

Create a new JavaScript file, `Counter.js` and paste this code into it
```
import React from "react";

const counter = props => (
  <div>
    <p>Total: {props.total}</p>
  </div>
);

export default counter;
```
This is a `stateless` component. Very easy, means that it doesn't manage the application state. I recommend to use `stateless` components as much as you can for two reasons:

* they make easier to build maintainable applications
* they are highly reusable
* they let you to manage the application state in few selected components

Now we can use this `Counter` component in our `App.js`
```
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
        <button className="Toggle" onClick={() => this.handleToggle(todo.id)}>
          Toggle
        </button>
      </li>
    ))}
  </ul>
  <Counter total={this.state.todos.length} />
</div>
```
As you can see, the `Counter` components helps us to keep track of how many to-dos items we have in that list. Useful, isn't?

This component updates (and re-render) every time `props` changes. Read about [components lifecycle methods](https://reactjs.org/docs/react-component.html) to dig into it.

## Must read
React components lifecycle methods: https://reactjs.org/docs/react-component.html, http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## Author

👤 **Rossano D&#39;Angelo**

- Twitter: [@RossanoDan](https://twitter.com/RossanoDan)
- Github: [@rossanodan](https://github.com/rossanodan)

## Show your support

I hope you have enjoyed this codelab and I invite you to check our other tuts on https://github.com/gdg-galway.

You can also join our community and find us on the following platforms:
- Twitter: https://twitter.com/GDGgalway
- Meetup: https://www.meetup.com/Google-Developers-Group-in-Galway-Meetup/
- Discord: https://discord.gg/JWNVT4W
- Discourse: https://forum.gdg-galway.com

Give a ⭐️ if this project helped you!