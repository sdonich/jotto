import { storeFactory } from '../test/testUtils';
import { guessWord, clearGuessedWords, startNewGame } from './actions';

describe('guessWord action dispather', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';
  describe('no guesse words', () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3
          }
        ]
      };
      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }
        ]
      }

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guesse words', () => {
    let store;
    const guessedWords = [{
      guessedWord: 'agile', letterMatchCount: 1
    }];
    const initialState = { guessedWords, secretWord };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [...guessedWords, { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }]
      };
      expect(newState).toEqual(expectedState);

    });
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [...guessedWords, { guessedWord: secretWord, letterMatchCount: 5 }]
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('new game started', () => {
    let store;
    const guessedWords = [{
      guessedWord: 'train',
      letterMatchCount: 3
    }]
    const initialState = {
      guessedWords,
      success: true
    }
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('new game clear guessedWords', () => {
      store.dispatch(clearGuessedWords());
      const newState = store.getState();
      const expectedGuessedWord = [];
      expect(expectedGuessedWord).toEqual(newState.guessedWords);
    });
    test('new game switch success to false', () => {
      store.dispatch(startNewGame());
      const newState = store.getState();
      expect(newState.success).toBe(false);
    });
  });
});
