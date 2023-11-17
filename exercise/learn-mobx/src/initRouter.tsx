import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    RouterStore,
    RouterState
} from 'mobx-state-router';

const notFound = createRouterState('notFound');
// const checkForUserSignedIn = (fromState, toState, routerStore) => {
//     const {
//         rootStore: { authStore }
//     } = routerStore;
//     if (authStore.user) {
//         return Promise.resolve();
//     } else {
//         authStore.setSignInRedirect(toState);
//         return Promise.reject(new RouterState('signin'));
//     }
// };
export const routes = [
    {
        name: 'home',
        pattern: '/',
    },
    {
        name: 'todoList',
        pattern: "/todoList",
        queryParams: ['q'],

    },
    {
        name: 'department',
        pattern: '/departments/:id',
    },
    {
        name: 'notFound',
        pattern: '/not-found',
    },
];

export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);

    // Observe history changes
    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}