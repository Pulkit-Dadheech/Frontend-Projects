import React from 'react';
import './App.css';
import { RouterContext, RouterView } from 'mobx-state-router';
import { initRouter } from './initRouter';
import { viewMap } from './viewMap';
import {TodoList} from "./store/TodoList";
import {TodoStore} from "./store/TodoStore";

function App() {
    const routerStore = initRouter();

    return (
        // <div className="App">
        //     <TodoList todoStore={TodoStore}/>
        // </div>
        <RouterContext.Provider value={routerStore}>
            <RouterView viewMap={viewMap} />
        </RouterContext.Provider>
    );
}

export default App;
