import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

import App, { UnconnectedApp } from './App';
import { Input } from './'

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<App store={store} />).dive().dive();
}

describe('render new game button', () => {
  test('when success is true', () => {
    const success = true;
    const wrapper = setup({ success });

    const newGameButton = findByTestAttr(wrapper, 'new-game-button');
    expect(newGameButton.length).toBe(1);
  });
  describe('when success is false', () => {
    test('isGiveUp is false', () => {
      const isGiveUp = false;
      const success = false;
      const wrapper = setup({ success, isGiveUp });

      const newGameButton = findByTestAttr(wrapper, 'new-game-button');
      expect(newGameButton.length).toBe(0);
    });
    test('isGiveUp is true', () => {
      const isGiveUp = true;
      const success = false;
      const wrapper = setup({ success, isGiveUp });

      const newGameButton = findByTestAttr(wrapper, 'new-game-button');
      expect(newGameButton.length).toBe(1);
    });

  });
});

describe('render "carry message" or Input component', () => {
  test('when isGiveUp is true', () => {
    const isGiveUp = true;
    const wrapper = setup({ isGiveUp });
    const carryMessage = findByTestAttr(wrapper, 'carry-message');
    expect(carryMessage.length).toBe(1);
  });
  test('when isGiveUp is false', () => {
    const isGiveUp = false;
    const wrapper = setup({ isGiveUp });
    const carryMessage = findByTestAttr(wrapper, 'carry-message');
    expect(carryMessage.length).toBe(0);
  });
  test('render Input component when isGiveUp false and success false', () => {
    const isGiveUp = false;
    const success = false;
    const wrapper = setup({ isGiveUp, success });
    const component = wrapper.find(Input);
    expect(component.length).toBe(1);
  });
  test('"carry message" shows current secret word', () => {
    const secretWord = 'party';
    const isGiveUp = true;
    const wrapper = setup({ secretWord, isGiveUp });
    const carryMessage = findByTestAttr(wrapper, 'carry-message');
    const uncoverWord = carryMessage.find('span');

    expect(uncoverWord.text()).toBe(secretWord);
  });
});

describe('redux props', () => {
  test('has access to success state', () => {
    const success = false;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });
  test('has access to isGiveUp state', () => {
    const isGiveUp = false;
    const wrapper = setup({ isGiveUp });
    const isGiveUpProp = wrapper.instance().props.isGiveUp;

    expect(isGiveUpProp).toBe(isGiveUp);
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
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('getSecretWord action creator is a function prop', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;

    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
  test('clearGuessedWords action creatore is a function prop', () => {
    const wrapper = setup();
    const clearGuessedWords = wrapper.instance().props.clearGuessedWords;

    expect(clearGuessedWords).toBeInstanceOf(Function);
  });

});

describe('action creators running', () => {
  describe('runs action creator with new game', () => {
    let wrapper;
    let clearGuessedWordsMock;
    let getSecretWordMock;
    let startNewGameMock;
    beforeEach(() => {
      clearGuessedWordsMock = jest.fn();
      getSecretWordMock = jest.fn();
      startNewGameMock = jest.fn();
      const props = {
        clearGuessedWords: clearGuessedWordsMock,
        getSecretWord: getSecretWordMock,
        startNewGame: startNewGameMock,
        success: true,
        guessedWords: [
          {
            guessedWord: 'train',
            letterMatchCount: 3
          }
        ]
      }
      wrapper = shallow(<UnconnectedApp {...props} />);
      const newGameButton = findByTestAttr(wrapper, 'new-game-button');
      newGameButton.simulate('click');
    });
    test('clearGuessedWords runs when push new game button', () => {
      const clearGuessedWordsMockCallCount = clearGuessedWordsMock.mock.calls.length;
      expect(clearGuessedWordsMockCallCount).toBe(1);
    });
    test('getSecretWord runs when push new game button', () => {
      const getSecretWordMockCallCount = getSecretWordMock.mock.calls.length;
      expect(getSecretWordMockCallCount).toBe(1);
    });
    test('startNewGame runs when push new game button', () => {
      const startNewGameMockCallCount = startNewGameMock.mock.calls.length;
      expect(startNewGameMockCallCount).toBe(1);
    });
  });

  test('getSecretWord runs on App mount', () => {
    const getSecretWordMock = jest.fn();
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: []
    }
    const wrapper = shallow(<UnconnectedApp {...props} />);
    wrapper.instance().componentDidMount();

    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

    expect(getSecretWordCallCount).toBe(1);
  });
});

