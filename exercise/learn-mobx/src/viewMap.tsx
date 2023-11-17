import React from 'react';
import { DepartmentPage} from './pages/DepartmentPage';
import {HomePage} from "./pages/HomePage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {TodoList} from "./store/TodoList";
import {TodoStore} from "./store/TodoStore";

export const viewMap = {
    department: <DepartmentPage />,
    home: <HomePage />,
    todoList: <TodoList todoStore={TodoStore}/>,
    notFound: <NotFoundPage />,
};