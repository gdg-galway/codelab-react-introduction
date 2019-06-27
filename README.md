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
```javascript
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
As I said, the `state` is a JavaScript object that defines how a component behaves. In this case we have to do with a to-do app so the state contains... :scream_cat: to-dos!

Change `this.state` into the following object
```javascript
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
```javascript
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
```javascript
<div className="Container">
  {this.state.todos.map(todo => <p key={todo.is}>{todo.description}</p>)}
</div>
```
And this is the reason why I used `Date.now()`, `Date.now() + 1`, `Date.now() + 2` and `Date.now() + 3` as to-do identifiers. We need **unique** values.

If you want to learn more about this topic, [take a look to the official documentation](https://reactjs.org/docs/reconciliation.html).

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