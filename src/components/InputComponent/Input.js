import React from 'react';
import { connect } from 'react-redux';

import { guessWord, giveUp } from '../../actions';

export class UnconnectedInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputBox = React.createRef();
  }

  submitGuessedWord = (evt) => {
    evt.preventDefault();

    const guessedWord = this.inputBox.current.value;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }
    this.inputBox.current.value = '';
  }

  render() {
    const contents = this.props.success ?
      null
      :
      (
        <form className="form-inline">
          <input data-test="input-box" className="mb-2 mx-sm-3"
            id="word-guess"
            type="text"
            placeholder="enter guess"
            ref={this.inputBox}
          />
          <button
            data-test="submit-button"
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.submitGuessedWord}
          >
            Submit
          </button>
          <button
            data-test="give-up-button"
            className="btn mb-2"
            onClick={this.props.giveUp}
          >
            Give up
          </button>
        </form>
      );

    return (
      <div data-test="component-input">
        {contents}
      </div>
    );
  }
}

const mapStateToProps = ({ success }) => {
  return {
    success
  };
}

const actionsCreator = {
  guessWord,
  giveUp
}

export default connect(mapStateToProps, actionsCreator)(UnconnectedInput);