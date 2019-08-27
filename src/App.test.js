import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory } from '../test/testUtils';

import App from './App';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<App store={store} />).dive().dive();
}

describe('redux props', () => {
  test('has access to success state', () => {
    const success = false;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });
  test('has guessedWords piece of state to props', () => {
    const guessedWords = [{
      guessedWord: 'train',
      letterMatchCount: 3
    }]
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;

    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test('has access to secretWord state', () => {
    const secretWord = 'party';
    const wrapper = setup({secretWord});
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('getSecretWord action creator is a function prop', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;

    expect(getSecretWordProp).toBeInstanceOf(Function);
  });

});