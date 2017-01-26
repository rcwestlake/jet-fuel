import React, { PropTypes } from 'react';

const Folder = ({ folder, displayURLs }) => {
  return (
    <li
      key={folder.id}
      id={folder.id}
      onClick={(e) => displayURLs(e)}
    >
      {folder.title}
    </li>
  );
}

Folder.propTypes = {
  url: PropTypes.object,
  index: PropTypes.number
}

export default Folder;
