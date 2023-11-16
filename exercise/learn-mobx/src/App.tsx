import React from 'react';
import './App.css';
import {TodoList} from "./store/TodoList";
import {TodoStore} from "./store/TodoStore";

function App() {
    return (
        <div className="App">
            <TodoList todoStore={TodoStore}/>
        </div>
    );
}

export default App;
