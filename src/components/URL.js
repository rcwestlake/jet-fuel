/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import moment from 'moment'

class URL extends Component {
  patchRequest() {
    const { url } = this.props
    axios.patch(`http://localhost:3001/urls/${url.folder_id}/${url.urlKey}`)
    .then((response) => {
      this.props.updateURLState(response.data)
      return response
    })
    .then(() => {
      window.location.href = `http://${url.url}`
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
        <p>{url.urlKey}</p>
        <p>Date Added: {moment(url.created_at).format('MMM DD YYYY')}</p>
        <p>Popularity: {url.count}</p>
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
