/* eslint import/no-webpack-loader-syntax: 0 */
import React, { PropTypes } from 'react';

const Folder = ({ folder, displayURLs }) => {
  return (
    <li
      key={folder.id}
      id={folder.id}
      className='folder'
      onClick={e => displayURLs(e)}
    >
      {folder.title}
    </li>
  );
}

Folder.propTypes = {
  folder: PropTypes.object,
  displayURLs: PropTypes.func,
}

export default Folder;
