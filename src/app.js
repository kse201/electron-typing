import React from 'react'

const words = [
  'foo',
  'bar',
  'hoge',
  'fuga'
]

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initData()
  }

  initData () {
    return {
      currentWord: words[Math.floor(Math.random() * words.length)],
      inputWord: ''
    }
  }

  resetText () {
    this.setState(this.initData())
  }

  checkKey (key) {
    const idx = this.state.inputWord.length
    const chr = this.state.currentWord[idx]

    if (chr === key) {
      return true
    } else {
      return false
    }
  }

  checkFinished () {
    if (this.state.inputWord === this.state.currentWord) {
      return true
    } else {
      return false
    }
  }

  onKeyUp (e) {
    const key = String.fromCharCode(e.keyCode).toLowerCase()
    if (!this.checkKey(key)) {
      return
    }
    let word = this.state.inputWord

    word += key
    this.setState({inputWord: word})

    if (this.checkFinished()) {
      this.resetText()
    }
  }

  componentWillMount () {
    document.addEventListener('keyup', (e) => { this.onKeyUp(e) })
  }

  render () {
    return (
      <div>
        <div>{this.state.currentWord}</div>
        <div>{this.state.inputWord}</div>
      </div>
    )
  }
}
