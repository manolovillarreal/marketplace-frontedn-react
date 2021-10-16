import {types} from '../types/types'

// const state = {
//     name:'Manuel',
//     logged:true
// }

export const authReducer = (state = {}, action) => {

  switch (action.type) {
    case types.authLogin:
        return{
            ...state,
            ...action.payload,
            logged:true,
            checking:false
        }
    case types.authLogout:
        return{
            logged:false,
            checking:true
        }

    default:
        return state;
  }
};
