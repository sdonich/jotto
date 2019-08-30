import { actionTypes } from '../actions';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.GIVE_UP:
      return true;
    
    case actionTypes.START_NEW_GAME:
      return false;
  
    default:
      return state;
  }  
}