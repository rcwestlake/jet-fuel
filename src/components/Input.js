/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';

class Input extends Component {
  render() {
    const { id, btnid, folderInput, placeholder, buttonText, handleChange, addMethod, param } = this.props
    return (
      <div>
        <input
          id={id}
          value={folderInput}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button
          id={btnid}
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
