/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import URL from './URL'
import Folder from './Folder'

class Container extends Component {
  render() {
    const { folders, selectedFolder, filteredURLs, displayURLs, updateURLState, urls } = this.props

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
          <h1
            id="sidebar-title"
            onClick={()=> window.location.href = '/'}
            >
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
          {filteredURLs.length ? filteredURLs.map((url, i) =>
            <URL
              index={i}
              url={url}
              updateURLState={updateURLState}
            />)
          : urls.map((url, i) =>
            <URL
              index={i}
              url={url}
              updateURLState={updateURLState}
            />)
          }
        </ul>
      </div>
    )
  }
}

Container.propTypes = {
  urls: PropTypes.array,
  folders: PropTypes.array,
  updateFolderState: PropTypes.func,
  selectedFolder: PropTypes.array,
  filteredURLs: PropTypes.array,
  updateURLState: PropTypes.func,
}

export default Container;
