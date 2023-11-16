import React from 'react';
import { DepartmentPage, HomePage, NotFoundPage } from './pages';
import {TodoList} from "./store/TodoList";
import {TodoStore} from "./store/TodoStore";

export const viewMap = {
    department: <DepartmentPage />,
    home: <HomePage />,
    todoList: <TodoList todoStore={TodoStore}/>,
    notFound: <NotFoundPage />,
};