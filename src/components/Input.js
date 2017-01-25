import React, { Component } from 'react';

class Input extends Component {
  render() {
    return(
      <span>
        <input
        value={this.props.folderInput}
        placeholder="Enter a folder"
        onChange={(event) => this.props.handleChange(event)}
        />
      </span>
    )
  }
};

export default Input;
