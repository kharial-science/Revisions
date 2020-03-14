import React, { Component } from 'react'
import './App.css'

import Display from './Display/Display'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: undefined,
      currentWord: undefined,
      lastWords: []
    }

    this.initiateSpreadsheetRequest = this.initiateSpreadsheetRequest.bind(this)
    this.spreadsheetCallback = this.spreadsheetCallback.bind(this)
    this.useWorksheetRows = this.useWorksheetRows.bind(this)

    this.enableKeyListener = this.enableKeyListener.bind(this)

    this.pickRandomWordFromRows = this.pickRandomWordFromRows.bind(this)
  }

  componentDidMount() {
    this.initiateSpreadsheetRequest()
    this.enableKeyListener()
  }

  initiateSpreadsheetRequest() {
    const GoogleSpreadsheets = require('google-spreadsheets')
    const options = { key: '13116MH8PX-pqPIc_aAh5Uj9RczH8ns0B1uwkRTV21uM' }
    GoogleSpreadsheets(options, this.spreadsheetCallback)
  }

  spreadsheetCallback(err, spreadsheet) {
    if (err) throw err
    spreadsheet.worksheets[0].rows({}, this.useWorksheetRows)
  }

  useWorksheetRows(err, rowsArray) {
    if (err) throw err
    this.setState({ rows: rowsArray }, this.pickRandomWordFromRows)
  }

  enableKeyListener() {
    document.onkeypress = (e) => {
      if (e.charCode === 32) {
        console.log('space')
      }
    }
  }

  pickRandomWordFromRows() {
    const randomWord = this.state.rows[Math.floor(Math.random() * this.state.rows.length)]
    this.setState({ currentWord: randomWord })
  }

  render() {
    return (
      <div id="App">
        {this.state.currentWord && <Display definition={this.state.currentWord.definition} word={this.state.currentWord.word} />}
      </div>
    )
  }
}

export default App