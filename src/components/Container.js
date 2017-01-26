/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import URL from './URL'
import Folder from './Folder'

class Container extends Component {
  render() {
    const { folders, selectedFolder, filteredURLs, displayURLs } = this.props
    const list = folders.map((folder) => {
      return (
        <Folder
          folder={folder}
          displayURLs={e => displayURLs(e)}
        />
      )
    })

    return (
      <div>
        <aside>
          <h1 id="sidebar-title">
            FOLDERS
            <i className="material-icons">keyboard_arrow_down</i>
          </h1>
          <ul id="folders">
            {list}
          </ul>
        </aside>

        <h1 id="urls-title">
          {selectedFolder[1] ? `${selectedFolder[1]} URLS` : 'YOUR URLS'}
          <i className="material-icons">keyboard_arrow_down</i>
        </h1>
        <ul id="urls">
          {!!filteredURLs && filteredURLs.map((url, i) =>
            <URL
              index={i}
              url={url}
            />
          )}
        </ul>
      </div>
    )
  }
}

Container.propTypes = {
  urls: PropTypes.array,
  folders: PropTypes.array,
  updateFolderState: PropTypes.func,
  selectedFolder: PropTypes.string,
  filteredURLs: PropTypes.array,
}

export default Container;
