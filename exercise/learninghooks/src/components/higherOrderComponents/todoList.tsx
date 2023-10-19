import React, {useState} from "react";
import HOC, {listItemsEntities} from "./HOC";

const TodoList: React.FC<{ listItems: listItemsEntities[] }> = ({listItems}) => {

    const [term, setTerm] = useState(" ");
    const filteredUser = listItems
        .filter((listItem) => {
            if (listItem.title) {
                return listItem.title.toLowerCase().indexOf(term.toLowerCase()) >= 0;
            }
        }).slice(0,10)
        .map((listItem) => {
            return (
                <div key={listItem.userId}>
                    <p>
                        <strong>{listItem.title}</strong>
                    </p>
                </div>
            );
        });
    return (
        <>
            <div><strong>Todos</strong></div>
            <input
                type="text"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />

            <div>{filteredUser}</div>
        </>
    );
};
const EnhancedTodoList = HOC(TodoList, "todos");
export default EnhancedTodoList;
