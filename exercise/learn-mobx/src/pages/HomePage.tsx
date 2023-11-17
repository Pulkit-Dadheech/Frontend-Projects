import React from 'react';
import { useRouterStore } from 'mobx-state-router';

export const HomePage = () => {
    const routerStore = useRouterStore();

    const handleElectronicClick = () => {
        routerStore.goTo('department', {
            params: { id: 'electronics' },
        });
    };
    const handleTodoClick = () =>{
        routerStore.goTo('todoList',{
            queryParams: {q: 'todoList'},
        })
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleElectronicClick}>Go to Electronics</button>
            <button onClick={handleTodoClick}>Go to TodoList</button>
        </div>
    );
};