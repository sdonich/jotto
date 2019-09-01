import axios from 'axios';

import { getLetterMatchCount } from '../utils';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  CLEAR_GUESSED_WORDS: 'CLEAR_GUESSED_WORDS',
  START_NEW_GAME: 'START_NEW_GAME',
  GIVE_UP: 'GIVE_UP'
};

export const guessWord = guessedWord => {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  }
}

export const getSecretWord = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3030')
      .then(response => {
        dispatch({
          type: actionTypes.SET_SECRET_WORD,
          payload: response.data
        });
      })
  };
}

export const clearGuessedWords = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_GUESSED_WORDS
    });
  }
}

export const startNewGame = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.START_NEW_GAME
    });
  }
}

export const giveUp = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GIVE_UP
    });
  }
}

export const changeSecretWord = () => {
  return (dispatch) => {
    
  }
}