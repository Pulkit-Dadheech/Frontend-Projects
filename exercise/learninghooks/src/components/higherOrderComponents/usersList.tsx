import React, {useState} from "react";
import HOC from "./HOC";
import {listItemsEntities} from "./HOC";

const UsersList: React.FC<{ listItems: listItemsEntities[] }> = ({listItems}) => {

    const [term, setTerm] = useState(" ");
    const filteredUser = listItems
        .filter((listItem) => {
            if(listItem.name){

                return listItem.name.toLowerCase().indexOf(term.toLowerCase()) >= 0;
            }
        })
        .map((listItem) => {
            return (
                <div key={listItem.id}>
                    <p>
                        <strong>{listItem.name}</strong>
                    </p>
                </div>
            );
        });

    return (
        <>
            <div><strong>Users</strong></div>
            <input
                type="text"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />


            <div>{filteredUser}</div>
        </>
    )
}
const EnhancedUsersList = HOC(UsersList, "users");
export default EnhancedUsersList;