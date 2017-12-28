import React from 'react'
import Timer from './timer'

// TODO remove magic valibles
const words = [
  'foo',
  'bar',
  'hoge',
  'fuga'
]

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentWord: '',
      inputWord: '',
      isLive: false,
      timer: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillMount () {
    document.addEventListener('keyup', (e) => { this.handleKeyUp(e) })
  }

  resetText () {
    this.setState({
      currentWord: words[Math.floor(Math.random() * words.length)],
      inputWord: ''
    })
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

  start () {
    if (this.state.timer != null) {
      this.state.timer.reset()
    }
    this.setState({
      timer: <Timer limit='5' onChange={e => this.handleChange(e)}/>,
      currentWord: words[Math.floor(Math.random() * words.length)],
      inputWord: '',
      isLive: true
    })
  }

  handleKeyUp (e) {
    if (!this.state.isLive) {
      return
    }
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

  handleClick () {
    this.start()
  }

  handleChange (e) {
    if (!e.isLive) {
      this.setState({isLive: false})
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.timer}
        <div className='currentWord'>{this.state.currentWord}</div>
        <div className='inputWord'>{this.state.inputWord}</div>
        <div className='btn' onClick={this.handleClick}>
          {this.state.isLive ? '' : 'click to start' }
        </div>
      </div>
    )
  }
}
