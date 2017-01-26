/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';

class Input extends Component {
  render() {
    const { id, btnid, folderInput, placeholder, buttonText, handleChange, addMethod, param } = this.props

    let selectedFolder;

    param === 'folderInput' ? selectedFolder = true : selectedFolder = this.props.selectedFolder.length
    return (
      <span>
        <input
          id={id}
          value={folderInput}
          placeholder={placeholder}
          onChange={e => handleChange(e, param)}
        />
        <button
          id={btnid}
          onClick={addMethod}
          disabled={!selectedFolder}
        >
          {buttonText}
        </button>
      </span>
    )
  }
}

Input.propTypes = {
  id: PropTypes.string,
  btnid: PropTypes.string,
  folderInput: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  handleChange: PropTypes.func,
  addMethod: PropTypes.func,
  param: PropTypes.string,
  selectedFolder: PropTypes.array,
}

export default Input;
