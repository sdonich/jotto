import { combineReducers } from 'redux';
import success from './success';
import guessedWords from './guessedWordsReducer';

export default combineReducers({
  success,
  guessedWords
});