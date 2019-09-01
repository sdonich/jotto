import { combineReducers } from 'redux';
import success from './success';
import guessedWords from './guessedWords';
import secretWord from './secretWord';
import isGiveUp from './giveUp';
import isEnteringSecretWord from './isEnteringSecretWord';

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  isGiveUp,
  isEnteringSecretWord
});