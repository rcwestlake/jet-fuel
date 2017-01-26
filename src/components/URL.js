/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import axios from 'axios'

class URL extends Component {
  patchRequest() {
    const { url } = this.props
    axios.patch(`http://localhost:3001/urls/${url.folder_id}/${url.urlKey}`)
    .then((response) => {
      this.props.updateURLState(response.data)
      return response
    })
    .then((response) => {
      window.location.href = response.request.responseURL
    })
  }

  render() {
    const { url, index } = this.props
    return (
      <li
        className="url"
        key={index}
        onClick={() => this.patchRequest()}
      >
        {`irw.in/${url.urlKey}`}
      </li>
    );
  }
}

URL.propTypes = {
  url: PropTypes.object,
  index: PropTypes.number,
  updateURLState: PropTypes.func,
}

export default URL;
