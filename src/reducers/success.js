import { actionTypes } from "../actions";

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;

    case actionTypes.START_NEW_GAME:
      return false;
  
    default:
      return state;
  }
}