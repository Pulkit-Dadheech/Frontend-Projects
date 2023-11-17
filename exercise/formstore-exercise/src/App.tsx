import React from 'react';
import './App.css';
import {RouterContext, RouterView} from 'mobx-state-router';
import {viewMap} from './viewMap';
import {initRouter} from "./initRouter";

function App() {
    const routerStore = initRouter();
    return (
        <RouterContext.Provider value={routerStore}>
            <RouterView viewMap={viewMap}/>
        </RouterContext.Provider>
    );
}

export default App;
