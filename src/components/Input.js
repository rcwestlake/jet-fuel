import React, { Component } from 'react';

class Input extends Component {
  render() {
    return(
      <span>
        <input
        placeholder="Enter your guess!"
        onChange={(event) => this.props.handleChange(event)}
        />
      </span>
    )
  }
};

export default Input;
