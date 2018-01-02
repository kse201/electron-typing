import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
const remote = require('electron').remote

ReactDOM.render(<App />, document.getElementById('app'))

const closeButton = document.querySelector('#close')

closeButton.addEventListener('click', () => {
  const window = remote.getCurrentWindow()
  window.close()
})
