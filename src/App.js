import React from 'react';
import './App.css';
import { createStore } from 'redux';

const defaultState = { checked: false };
const reducer = function(state = defaultState, action) {
 switch (action.type) {
    case 'TOGGLE':
      return { ...state, checked: !state.checked };
    default:
      return state;
  }
};
const store = createStore(reducer);

function App() {
  return (
    <div>
    </div>
  );
}

export default App;
