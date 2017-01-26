import React, { Component } from 'react';

class SideBar extends Component {
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

    const list = folders.map((folder) =>
      <li
        id={folder.id}
        onClick={(location)=>this.displayURLs(location)}
        key={folder.id}
      >
        {folder.title}
      </li>
    )

    return(
      <aside>
        <ul>
          {list}
          { filteredURLs ? filteredURLs.map((url, i) =>
            <li key={i}> {url.urlKey} </li>
          )
          : ''}
        </ul>
      </aside>
    )
  }
};

export default SideBar;
