import {autorun, makeAutoObservable} from "mobx";

interface ITodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export class TodoStoreImplement {
    todos: ITodoItem[] = [];
    state = {uniqueID: 1};

    constructor() {
        makeAutoObservable(this,
            // {
            //     todos: observable,
            //     state: observable,
            //     addTodo: action,
            //     removeTodo: action,
            // }
        );
        autorun(() => {
            console.log("Current Todos:", this.todos);
        });
    }


    addTodo(title: string) {
        const item: ITodoItem = {
            id: this.state.uniqueID++,
            title: title,
            completed: false
        }
        this.todos.push(item);
    }

    removeTodo() {
        this.todos.pop();
    }

}

export const TodoStore = new TodoStoreImplement();



