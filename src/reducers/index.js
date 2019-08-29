import { combineReducers } from 'redux';
import success from './success';
import guessedWords from './guessedWords';
import secretWord from './secretWord';
import isGiveUp from './giveUp';

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  isGiveUp
});