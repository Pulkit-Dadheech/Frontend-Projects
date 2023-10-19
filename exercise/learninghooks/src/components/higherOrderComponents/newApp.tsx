import EnhancedUsersList from "./usersList";
import EnhancedTodoList from "./todoList";
import './list.css';

export default function NewApp() {
    return (
        <div className="Apps">
            <h2>Higher Order Components</h2>
            <div className="mainSection">
                <div className="section">
                    <EnhancedUsersList/>
                </div>
                <div className="section">
                    <EnhancedTodoList/>
                </div>
            </div>

        </div>
    )
}