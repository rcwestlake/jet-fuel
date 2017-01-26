/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';

class Input extends Component {
  render() {
    return (
      <span>
        <input
          id='add-folder-input'
          value={this.props.folderInput}
          placeholder="Enter a folder"
          onChange={event => this.props.handleChange(event)}
        />
      </span>
    )
  }
}

Input.propTypes = {
  folderInput: PropTypes.string,
  handleChange: PropTypes.func,
}

export default Input;
