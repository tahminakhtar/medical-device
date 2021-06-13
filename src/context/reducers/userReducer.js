export const userReducer = (state, action) => {
    switch (action.type) {
        case 'USERSLIST':
            return {
                ...state,
                users: action.users,
            };
        case 'ERROR':
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}