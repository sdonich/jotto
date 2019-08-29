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
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        {
          this.props.success ?
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
        <Input />
        <GuessedWords
          guessedWords={this.props.guessedWords}
        />
        <div style={{fontSize: '10px'}}>secret word is: {this.props.secretWord}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
}
const actionCreators = {
  getSecretWord,
  clearGuessedWords,
  startNewGame
}

export default connect(mapStateToProps, actionCreators)(UnconnectedApp);
