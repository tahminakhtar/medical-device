export const overviewReducer = (state, action) => {
    switch (action.type) {
        case 'MODEL_TYPES':
            return {
                ...state,
                modelTypes: action.modelTypes,
            };
        case 'MODEL_DATAS':
            return {
                ...state,
                modelDatas: action.modelDatas,
            };
        case 'ERROR':
            return {
                ...state,
            }
        default:
            return state;
    }
}