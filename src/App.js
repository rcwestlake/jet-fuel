import React, { Component } from 'react';
import './App.css';
import Input from './components/Input'

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

  render() {
    return (
      <div className="App">
        <section>
          <Input handleChange={(event)=>this.handleChange(event)}/>
        </section>
      </div>
    );
  }
}

export default App;
