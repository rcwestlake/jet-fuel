import React, { Component } from 'react';
import './App.css';
import Input from './components/Input'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: ''
    }
  }

  handleChange(location){
    let userInput = location.target.value;
    this.setState({input: userInput});
  }

  addFolder(){
    const folder = this.state.input

    axios.post(('http://localhost:3001/folders'), { title: folder })
    .then((response) => console.log(response))
    .catch((error) => console.error(error))
  }

  render() {
    return (
      <div className="App">
        <section>
          <Input handleChange={(event)=>this.handleChange(event)}/>
          <button onClick={()=>this.addFolder()}>ADD FOLDER</button>
        </section>
      </div>
    );
  }
}

export default App;
