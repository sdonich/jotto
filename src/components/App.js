import React from 'react';
import { connect } from 'react-redux';

import {
  GuessedWords,
  Congrats,
  Input
} from './';

import { getSecretWord, clearGuessedWords, startNewGame } from '../actions';

export class UnconnectedApp extends React.Component {
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    const carryMessage = (
      <div data-test="carry-message">
        The secret word was <span>{this.props.secretWord}</span>.
        <br />
        Better luck next time!
      </div>
    );
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
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
        {this.props.isGiveUp ? carryMessage : <Input />}
        <GuessedWords
          guessedWords={this.props.guessedWords}
        />
        <div style={{fontSize: '10px'}}>secret word is: {this.props.secretWord}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { success, guessedWords, secretWord, isGiveUp } = state;
  return { success, guessedWords, secretWord, isGiveUp };
}
const actionCreators = {
  getSecretWord,
  clearGuessedWords,
  startNewGame
}

export default connect(mapStateToProps, actionCreators)(UnconnectedApp);
