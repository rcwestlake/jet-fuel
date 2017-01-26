import React, { PropTypes } from 'react';

const URL = ({ url, index}) => {
  return (
    <li key={index}>
      <a
        href={`http://${url.url}`}
        target="_blank"
      >
        {url.urlKey}
      </a>
    </li>
  );
}

URL.propTypes = {
  url: PropTypes.object,
  index: PropTypes.number
}

export default URL;
