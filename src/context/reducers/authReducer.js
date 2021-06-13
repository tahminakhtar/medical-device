export const authReducer = (state, action) => {
   switch (action.type) {
      case 'SUCCESS':
         return {
            ...state,
            isLogin: true,
            accessToken: action.access_token,
            user: action.user,
            isError: false,
            errors: {
               email: '',
               password: ''
            }
         }
      case 'ERRORS':
         return {
            ...state,
            errors: action.error,
            isError: true
         }
      case 'LOGOUT':
         return {
            ...state,
            isLogin: false,
         }

      default:
         return state;
   }
}