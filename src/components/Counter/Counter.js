import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    console.log('[Counter.js] - constructor');
  }

  componentDidMount = () => {
    // This method is called as soon as the component is mounted and ready.
    // This is a good place to initiate API calls, if you need to load data from a remote endpoint.
    // You can update the components state within componentDidMound
    console.log('[Counter.js] - componentDidMount()');
  }

  componentDidUpdate = (prevProps) => {
    // The most common use case for the componentDidUpdate() method is
    // updating the DOM in response to prop or state changes.
    // You can update the components state within componentDidMound
    console.log('[Counter.js] - componentDidMount()');
  }

  componentWillUnmount = (prevProps) => {
    // This methodis called just before the component is unmounted and destroyed.
    // If there are any cleanup actions that you would need to do, this would be the right spot.
    // You cannot update the components state within componentDidMound
    console.log('[Counter.js] - componentDidMount()');
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // This lifecycle can be handy sometimes when you don’t want React to
    // render your state or prop changes.
    // This method exists only for certain performance optimizations.
    console.log('[Counter.js] - shouldComponentUpdate()');
    // Returns true only if something actually change
    console.log('[Counter.js] - nextProps', nextProps);
    console.log('[Counter.js] - nextState', nextState);
    return nextProps !== nextState;
  }
  
  render() {
    console.log('[Counter.js] - render()');
    return (
      <div>
        <p>Total: {this.props.total}</p>
      </div>
    );
  }
}

export default Counter;
