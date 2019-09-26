import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

const defaultState = { checked: false };
const reducer = function(state = defaultState, action) {
 switch (action.type) {
    case 'TOGGLE':
      return { ...state, checked: !state.checked };
    default:
      return state
  }
};
const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
