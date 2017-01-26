/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component } from 'react';
import axios from 'axios'
import './App.css'
import Input from './components/Input'
import Container from './components/Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      folders: [],
      urls: [],
      folderInput: '',
      urlInput: '',
      selectedFolder: null,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/folders')
    .then(response => this.setState({ folders: response.data }))
    .catch(error => console.error(error))

    axios.get('http://localhost:3001/urls')
    .then(response => this.setState({ urls: response.data }))
    .catch(error => console.error(error))
  }

  handleFolderChange(location) {
    const userInput = location.target.value;
    this.setState({ folderInput: userInput })
  }

  handleURLChange(location) {
    const userInput = location.target.value;
    this.setState({ urlInput: userInput })
  }

  updateSelectedFolder(folder_id) {
    this.setState({ selectedFolder: folder_id })
  }

  addFolder() {
    const folder = this.state.folderInput

    axios.post(('http://localhost:3001/folders'), { title: folder })
    .then((response) => {
      this.state.folders.push(response.data)
      this.setState({
        folders: this.state.folders,
      })
    })
    .catch(error => console.error(error))

    this.setState({ folderInput: '' })
  }

  addURLToFolder() {
    const folder_id = this.state.selectedFolder
    const url = this.state.urlInput
    axios.post((`http://localhost:3001/urls/${folder_id}`), { url })
    .then((response) => {
      this.state.urls.push(response.data)
      this.setState({
        urls: this.state.urls,
      })
    })
    .catch(error => console.error(error))

    this.setState({ urlInput: '' })
  }

  render() {
    const { folders, urls, folderInput, urlInput } = this.state
    return (
      <div className="App">
        <section>
          <Input
            folderInput={folderInput}
            placeholder="Enter a folder"
            buttonText="ADD FOLDER"
            handleChange={e => this.handleFolderChange(e)}
            addMethod={() => this.addFolder()}
          />
          <Input
            folderInput={urlInput}
            placeholder="Enter a URL"
            buttonText="ADD URL"
            handleChange={e => this.handleURLChange(e)}
            addMethod={() => this.addURLToFolder()}
          />
        </section>
        <Container
          folders={folders}
          updateFolderState={folder_id => this.updateSelectedFolder(folder_id)}
          urls={urls}
        />
      </div>
    );
  }
}

export default App;
