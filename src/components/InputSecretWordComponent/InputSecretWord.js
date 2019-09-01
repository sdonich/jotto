import React from 'react';
import { connect } from 'react-redux';

// import { enterSecretWord } from '../../actions';

export class UnconnectedInputSecretWord extends React.Component {
  render() {
    return (
      <form className="form-inline">
        <div>Enter a secret word for someone else to guess:</div>
        <input className="mb-2 mx-sm-3"
          type="text"
        />
        <button
          data-test="enter-secret-word"
          className="btn btn-primary mb-2"
        >
          Submit
          </button>
      </form>
    );
  }
}

const actionCreator = {
  // enterSecretWord
}

export default connect(null, actionCreator)(UnconnectedInputSecretWord);