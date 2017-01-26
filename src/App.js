/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component } from 'react';
import axios from 'axios'
import './styles/Reset.css'
import './styles/App.css'
import Input from './components/Input'
import Container from './components/Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      folders: [],
      urls: [],
      folderInput: '',
      urlInput: ''
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

  handleChange(location, param) {
    const userInput = location.target.value;
    const key = param;
    key === 'folderInput' ? this.setState({ folderInput: userInput }) : this.setState({ urlInput: userInput})
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

  addUrl() {
    const urlInput = this.state.urlInput

    //TODO: How to determine which folder to push new url into?

    axios.post(('http://localhost:3001/urls/'), { url: urlInput })
    .then((response) => {
      console.log(response)
    })
    .catch(error => console.error(error))

    this.setState({ urlInput: '' })
  }


  render() {
    const { folders, urls, folderInput, urlInput } = this.state
    return (
      <div className="App">
        <h1 id='app-title'>
          WELCOME TO <span id='cursive'>IRWIN</span> :<br/> YOUR FAVORITE URL SHORTENER
        </h1>

        <section>
          <Input
            id='add-folder-input'
            input={folderInput}
            handleChange={(event, param) => this.handleChange(event, param)}
            placeholder='Enter a folder'
            param='folderInput'
          />
          <button
            id='add-folder-button'
            onClick={() => this.addFolder()}
          >
            ADD <br/>FOLDER
          </button>
          <Input
            id='add-url-input'
            input={urlInput}
            handleChange={(event, param) => this.handleChange(event, param)}
            placeholder='Enter a URL'
            param='urlInput'
          />
          <button
            id='add-url-button'
            onClick={()=>this.addUrl()}
          >
            ADD <br/>URL
          </button>
        </section>

        <Container
          folders={folders}
          urls={urls}
        />
      </div>
    );
  }
}

export default App;
