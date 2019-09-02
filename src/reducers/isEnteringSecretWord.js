import { actionTypes } from '../actions';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SECRET_WORD:
      return true;
  
    default:
      return state;
  }
}