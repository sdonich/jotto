import React from 'react';
import { connect } from 'react-redux';

import {
  GuessedWords,
  Congrats,
  Input,
  InputSecretWord
} from './';

import {
  getSecretWord,
  clearGuessedWords,
  startNewGame,
  changeSecretWord
} from '../actions';

export class UnconnectedApp extends React.Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  renderGameMarkup() {
    const carryMessage = (
      <div data-test="carry-message">
        The secret word was <span>{this.props.secretWord}</span>.
        <br />
        Better luck next time!
      </div>
    );
    return (
      <React.Fragment>
        <Congrats success={this.props.success} />
        {this.props.isGiveUp ? carryMessage : <Input />}
        {
          this.props.success || this.props.isGiveUp ?
            <button
              data-test="new-game-button"
              onClick={() => {
                this.props.clearGuessedWords();
                this.props.getSecretWord();
                this.props.startNewGame();
              }}
            >New game</button>
            :
            null
        }
        <GuessedWords
          guessedWords={this.props.guessedWords}
        />
        <div style={{ fontSize: '10px' }}>secret word is: {this.props.secretWord}</div>
       {
         this.props.isGiveUp || this.props.success ? 
          null
          :
          <button
            data-test="enter-secret-word"
            onClick={this.props.changeSecretWord}
          >
            Enter your own secret word
          </button> 
       }
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        {this.props.isEnteringSecretWord ? <InputSecretWord /> : this.renderGameMarkup()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    success,
    guessedWords,
    secretWord,
    isGiveUp,
    isEnteringSecretWord
  } = state;
  return { success, guessedWords, secretWord, isGiveUp, isEnteringSecretWord };
}
const actionCreators = {
  getSecretWord,
  clearGuessedWords,
  startNewGame,
  changeSecretWord
}

export default connect(mapStateToProps, actionCreators)(UnconnectedApp);
