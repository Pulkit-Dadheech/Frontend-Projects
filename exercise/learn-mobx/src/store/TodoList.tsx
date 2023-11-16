import React, {useState} from "react";
import {TodoStoreImplement} from "./TodoStore";
import { observer } from "mobx-react-lite";

interface ITodoListProps {
    todoStore: TodoStoreImplement;
}

export const TodoList: React.FC<ITodoListProps> = observer(({todoStore}) => {
    const [todoListValue, setTodoListValue] = useState("");
    return <div>
        <input
            type={"text"}
            value={todoListValue}
            onChange={(e) => setTodoListValue(e.target.value)}
        />
        <button onClick={() => {
            todoStore.addTodo(todoListValue);
        }}>Submit
        </button>
        <button onClick={() => {
            todoStore.removeTodo();
        }}>Remove
        </button>


        <ul>
            {todoStore.todos.slice().reverse().map((todo) => {
                return <li>{todo.title}</li>
            })}

        </ul>

    </div>
})