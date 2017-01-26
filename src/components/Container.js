/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import URL from './URL'
import Folder from './Folder'

class Container extends Component {
  constructor() {
    super()
    this.state = {
      filteredURLs: [],
    }
  }

  displayURLs(location) {
    const id = location.target.id
    const title = location.target.innerHTML

    this.props.updateFolderState(id, title)
    const urls = this.props.urls.filter(url => url.folder_id == id)
    this.setState({ filteredURLs: urls })
  }

  render() {
    const { folders, selectedFolder } = this.props
    const { filteredURLs } = this.state

    const list = folders.map((folder) => {
      return (
        <Folder
          folder={folder}
          displayURLs={e => this.displayURLs(e)}
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
}

export default Container;
