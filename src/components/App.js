import React, { Component } from 'react'
import './App.css'

import assets from './../assets/assets'

const fs = require('fs')

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.onkeypress = (e) => {
      if(e.charCode === 32) {
        console.log('space')
      }
    }    

    const sheet = new assets.Sheet()
  }

  render() {
    return (
      <div id="App">
        <h1>hey</h1>
      </div>
    )
  }
}

export default App