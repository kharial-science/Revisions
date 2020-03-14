import React, { Component } from 'react'
import './App.css'

import Header from './Header/Header'
import Display from './Display/Display'
import Footer from './Footer/Footer'
import Background from './Background/Background'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: undefined,
      currentWord: undefined,
      lastWords: [],
      isFull: false
    }

    this.initiateSpreadsheetRequest = this.initiateSpreadsheetRequest.bind(this)
    this.spreadsheetCallback = this.spreadsheetCallback.bind(this)
    this.useWorksheetRows = this.useWorksheetRows.bind(this)

    this.enableKeyListener = this.enableKeyListener.bind(this)

    this.pickRandomWordFromRows = this.pickRandomWordFromRows.bind(this)
    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
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
        this.handleSpacebarPress()
      }
    }
  }

  pickRandomWordFromRows() {
    const randomWord = this.state.rows[Math.floor(Math.random() * this.state.rows.length)]
    this.setState({ currentWord: randomWord })
  }

  handleSpacebarPress() {
    let lastWords = this.state.lastWords.slice()
    lastWords.unshift(this.state.currentWord)
    if (!this.state.isFull && lastWords.length === 6) this.setState({ isFull: true })
    lastWords = lastWords.slice(0, 5)
    this.setState({ lastWords })

    this.pickRandomWordFromRows()
  }

  render() {
    const lastDisappeared = this.state.lastWords[1]
    const lastWord = this.state.lastWords[0]
    const currentWord = this.state.currentWord

    return (
      <div id="App">
        <Header />

        {lastDisappeared && <Display key={lastDisappeared.word + 'disap'} definition={lastDisappeared.definition} word={lastDisappeared.word} state='last-disappeared' />}
        {lastWord && <Display key={lastWord.word + 'last'} definition={lastWord.definition} word={lastWord.word} state='last' />}
        {currentWord && <Display key={currentWord.word} definition={currentWord.definition} word={'?'} state='current' />}
        
        <Footer lastWords={this.state.lastWords} isFull={this.state.isFull} />
        
        <Background />
      </div>
    )
  }
}

export default App