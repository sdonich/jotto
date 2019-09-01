import { storeFactory } from '../test/testUtils';
import { guessWord, clearGuessedWords, startNewGame, giveUp } from './actions';

describe('guessWord action dispather', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';
  const isGiveUp = false;
  describe('no guesse words', () => {
    let store;
    const initialState = { secretWord, isGiveUp };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: false,
        isEnteringSecretWord: false,
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
        isEnteringSecretWord: false,
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
    const isGiveUp = false;
    const initialState = { guessedWords, secretWord, isGiveUp };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: false,
        isEnteringSecretWord: false,
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
        isEnteringSecretWord: false,
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

describe('giveUp() action dispatcher', () => {
  let store;
  const isGiveUp = false;
  const initialState = { isGiveUp };
  beforeEach(() => {
    store = storeFactory(initialState);
  });
  test('giveUp() update state correctyle', () => {
    store.dispatch(giveUp());
    const newState = store.getState();
    const expectedIsGiveUp = true;

    expect(newState.isGiveUp).toBe(expectedIsGiveUp);
  });
});

describe('startNewGame action dispatcher', () => {
  test('startNewGame correctly change isGiveUp state', () => {
    const isGiveUp = true;
    const initialState = { isGiveUp };
    const store = storeFactory(initialState);
    store.dispatch(startNewGame());
    const newState = store.getState();
    const expectedIsGiveUp = false;

    expect(newState.isGiveUp).toBe(expectedIsGiveUp)
  });
});
