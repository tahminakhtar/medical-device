export const deviceTypeReducer = (state, action) => {
    switch (action.type) {
        case 'DEVICE_TYPES':
            return {
                ...state,
                deviceTypes: action.deviceTypes,
            };
        case 'ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}