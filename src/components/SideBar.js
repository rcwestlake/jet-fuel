import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    const { folders, urls } = this.props

    const list = folders.map((folder) => <li key={folder.id}> {folder.title} </li>)

    return(
      <aside>
        <ul>
          {list}
        </ul>
      </aside>
    )
  }
};

export default SideBar;
