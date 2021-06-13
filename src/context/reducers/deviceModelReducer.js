export const amenityReducer = (state, action) => {
    switch (action.type) {
        case 'AMENITIESLIST':
            return {
                ...state,
                amenities: action.amenities,
            };
        case 'HANDLECLOSE':
            return {
                ...state,
                show: false,
                amenity: {},
                editMode: false,
            };
        case 'HANDLESHOW':
            return {
                ...state,
                show: true,
            };
        case 'SUBMIT':
            return {
                ...state,
                isSubmit: action.isSubmit,
            };
        case 'EDITAMENITY':
            return {
                ...state,
                amenity: action.amenity,
                show: true,
                editMode: true,
            };
        case 'DELETEAMENITY':
            return {
                ...state,
                amenities: action.lists,
            };
        case 'SUCCESS':
            return {
                ...state,
                amenities: [...action.list, {
                    id: action.amenity.id,
                    icon_name: action.amenity.icon_name,
                    amenity_name: action.amenity.amenity_name,
                    amenity_name_pt: action.amenity.amenity_name_pt,
                }],
                show: false,
                editMode: false,
                permission: {},
                isError: false,
                errors: {
                    icon_name: '',
                    amenity_name: '',
                    amenity_name_pt: '',
                },
            };
        case 'ERRORS':
            return {
                ...state,
            }
        default:
            return state;
    }
}