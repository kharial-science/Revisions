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
      currentWordNumber: undefined,

      lastWords: [],
      isFull: false,

      // the first method of the array is the method used, when we switch, the array is reversed
      currentWordPickerMethod: ['pickRandomWordFromRows', 'pickNextWordFromRows'],
    }

    this.initiateSpreadsheetRequest = this.initiateSpreadsheetRequest.bind(this)
    this.spreadsheetCallback = this.spreadsheetCallback.bind(this)
    this.useWorksheetRows = this.useWorksheetRows.bind(this)

    this.enableKeyListener = this.enableKeyListener.bind(this)

    this.updateCurrentWord = this.updateCurrentWord.bind(this)
    this.pickRandomWordFromRows = this.pickRandomWordFromRows.bind(this)
    this.pickNextWordFromRows = this.pickNextWordFromRows.bind(this)

    this.handleSpacebarPress = this.handleSpacebarPress.bind(this)
    this.handleMethodSwitch = this.handleMethodSwitch.bind(this)
  }

  componentDidMount() {
    this.initiateSpreadsheetRequest()
    this.enableKeyListener()
  }

  initiateSpreadsheetRequest() {
    const GoogleSpreadsheets = require('google-spreadsheets')
    const options = { key: '19doP_Wwzrl7hQIJNWCSFXwn_NOrOjt7wX665tr9AAmc' }
    GoogleSpreadsheets(options, this.spreadsheetCallback)
  }

  spreadsheetCallback(err, spreadsheet) {
    if (err) throw err
    spreadsheet.worksheets[0].rows({}, this.useWorksheetRows)
  }

  useWorksheetRows(err, rowsArray) {
    if (err) throw err
    this.setState({ rows: rowsArray }, this.updateCurrentWord)
  }

  enableKeyListener() {
    document.onkeypress = (e) => {
      if (e.charCode === 32) {
        this.handleSpacebarPress()
      }
    }
  }

  updateCurrentWord() {
    const newWord = this[this.state.currentWordPickerMethod[0]]()
    this.setState({ currentWord: newWord, currentWordNumber: parseInt(newWord.number) })
  }

  pickRandomWordFromRows() {
    let randomWord = this.state.rows[Math.floor(Math.random() * this.state.rows.length)]

    while (this.state.lastWords.filter(word => word.word === randomWord.word).length) {
      randomWord = this.pickRandomWordFromRows()
    }

    return randomWord
  }

  pickNextWordFromRows() {
    const nextWord = this.state.rows[this.state.currentWordNumber + 2 < this.state.rows.length ? this.state.currentWordNumber + 1 : 0]
    return nextWord
  }

  handleSpacebarPress() {
    let lastWords = this.state.lastWords.slice()
    lastWords.unshift(this.state.currentWord)
    if (!this.state.isFull && lastWords.length === 6) this.setState({ isFull: true })
    lastWords = lastWords.slice(0, 5)
    this.setState({ lastWords })

    this.updateCurrentWord()
  }

  handleMethodSwitch() {
    const currentWordPickerMethod = this.state.currentWordPickerMethod.slice()
    const newWordPickerMethod = currentWordPickerMethod.reverse()
    this.setState({ currentWordPickerMethod: newWordPickerMethod }, () => console.log(this.state.currentWordPickerMethod))
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
        
        <Footer 
          lastWords={this.state.lastWords} 
          isFull={this.state.isFull} 
          handleMethodSwitch={this.handleMethodSwitch}
          currentWordPickerMethod={this.state.currentWordPickerMethod}
          currentWordNumber={this.state.currentWordNumber}
        />
        
        <Background />
      </div>
    )
  }
}

export default App