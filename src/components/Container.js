import React, { Component } from 'react';
import URL from './URL'
import Folder from './Folder'

class Container extends Component {
  constructor() {
    super()
    this.state = {
      filteredURLs: []
    }
  }

  displayURLs(location) {
    const id = location.target.id

    const urls = this.props.urls.filter((url) => url.folder_id == id)
    this.setState({ filteredURLs: urls })
  }

  render() {
    const { folders, urls } = this.props
    const { filteredURLs } = this.state

    const list = folders.map((folder) => {
      return <Folder
              folder={folder}
              displayURLs={(e) => this.displayURLs(e)}
            />
    })

    return(
      <aside>
        <ul>
          {list}
          {!!filteredURLs && filteredURLs.map((url, i) =>
          <URL
            index={i}
            url={url}
          />
          )}
        </ul>
      </aside>
    )
  }
};

export default Container;
