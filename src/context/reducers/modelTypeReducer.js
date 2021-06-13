export const modelTypeReducer = (state, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                modelType: action.modelType,
            };
        case 'ERRORS':
            return {
                ...state,
                errors: action.errors,
            }
        default:
            return state;
    }
}