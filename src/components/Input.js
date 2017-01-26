/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';

class Input extends Component {
  render() {
    const { folderInput, placeholder, buttonText, handleChange, addMethod } = this.props
    return (
      <div>
        <input
          value={folderInput}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button
          onClick={addMethod}
        >
          {buttonText}
        </button>
      </div>
    )
  }
}

Input.propTypes = {
  folderInput: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  handleChange: PropTypes.func,
  addMethod: PropTypes.func,
}

export default Input;
