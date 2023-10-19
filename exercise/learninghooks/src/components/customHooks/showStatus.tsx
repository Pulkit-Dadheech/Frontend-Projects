import { useOnlineStatus } from './useOnlineStatus';
export default function Status() {
    const isOnline = useOnlineStatus();
    return (
        <div>
            <h1>{isOnline ? 'Welcome to the Hooks Page' : 'Reconnecting...'}</h1>
            <p>{isOnline ? 'Here We have implemented Various Hooks' : 'Reconnecting...'}</p>
        </div>
    );
}
