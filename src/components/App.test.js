import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

import App, { UnconnectedApp } from './App';
import { Input, InputSecretWord } from './'

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

describe('render "enter your own secret word" button', () => {
  test('render when success is false and isGiveUp is false', () => {
    const success = false;
    const isGiveUp = false;
    const wrapper = setup({ success, isGiveUp });
    const enterOwnWordButton = findByTestAttr(wrapper, 'enter-secret-word');
    expect(enterOwnWordButton.length).toBe(1);
  });
  test('not render when success is true', () => {
    const success = true;
    const wrapper = setup({ success });
    const enterOwnWordButton = findByTestAttr(wrapper, 'enter-secret-word');
    expect(enterOwnWordButton.length).toBe(0);
  });
  test('not render when isGiveUp is true', () => {
    const isGiveUp = true;
    const wrapper = setup({ isGiveUp });
    const enterOwnWordButton = findByTestAttr(wrapper, 'enter-secret-word');
    expect(enterOwnWordButton.length).toBe(0);
  });
});

describe('render carryMessage markup or Input component', () => {
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

describe('render InputSecretWord component', () => {
  test('when isEnteringSecretWord is true', () => {
    const isEnteringSecretWord = true;
    const wrapper = setup({ isEnteringSecretWord });
    const component = wrapper.find(InputSecretWord);
    expect(component.length).toBe(1);
  });
  test('when isEnteringSecretWord is false', () => {
    const isEnteringSecretWord = false;
    const wrapper = setup({ isEnteringSecretWord });
    const component = wrapper.find(InputSecretWord);
    expect(component.length).toBe(0);
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
  test('has access to isEnteringSecretWord piece of state', () => {
    const isEnteringSecretWord = false;
    const wrapper = setup({ isEnteringSecretWord });
    const isEnteringSecretWordProp = wrapper.instance().props.isEnteringSecretWord;
    expect(isEnteringSecretWordProp).toBe(isEnteringSecretWord);
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
  test('changeSecretWord action cratore is a function prop', () => {
    const wrapper = setup();
    const changeSecretWord = wrapper.instance().props.changeSecretWord;
    expect(changeSecretWord).toBeInstanceOf(Function);
  });
});

describe('action creators running', () => {
  describe('runs action creator related with new game logic', () => {
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

  test('changeSecretWord() runs when push button "select your own secret word"', () => {
    const  changeSecretWordMock = jest.fn();
    const props = {
      changeSecretWord: changeSecretWordMock,
      success: false,
      guessedWords: []
    }
    const wrapper = shallow(<UnconnectedApp {...props} />);
    const enterOwnWordButton = findByTestAttr(wrapper, 'enter-secret-word');
    enterOwnWordButton.simulate('click');
    expect(changeSecretWordMock.mock.calls.length).toBe(1);
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

