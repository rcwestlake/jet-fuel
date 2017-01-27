/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import moment from 'moment'

class URL extends Component {
  patchRequest() {
    const { url } = this.props
    axios.patch(`/urls/${url.folder_id}/${url.urlKey}`)
    .then((response) => {
      this.props.updateURLState(response.data.urls)
    })
  }

  render() {
    const { url, index } = this.props
    return (
      <li
        key={index}
      >
        <p className="url">
          <a
            href={`https://${url.url}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => this.patchRequest()}
          >
            {url.urlKey}
          </a>
        </p>
        <p className="url-detail">Date Added: {moment(url.created_at).format('MMM DD YYYY')}</p>
        <p className="url-detail">Popularity: {url.count}</p>
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
