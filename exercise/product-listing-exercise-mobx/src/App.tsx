import React from "react";
import {initRouter} from "./initRouter";
import {RouterContext, RouterView} from 'mobx-state-router';
import {viewMap} from "./viewMap";

export default function App() {
    const routerStore = initRouter();

    return (
        <RouterContext.Provider value={routerStore}>
            <RouterView viewMap={viewMap}/>
        </RouterContext.Provider>
    );
}