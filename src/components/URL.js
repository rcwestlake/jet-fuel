/* eslint import/no-webpack-loader-syntax: 0 */
import React, { PropTypes } from 'react';

const URL = ({ url, index }) => {
  return (
    <li
      className='url'
      key={index}
      >
      <a
        href={`http://${url.url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url.urlKey}
      </a>
    </li>
  );
}

URL.propTypes = {
  url: PropTypes.object,
  index: PropTypes.number,
}

export default URL;
