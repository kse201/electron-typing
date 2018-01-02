let fs = require('fs')
const path = require('path')

// const data = fs.readFileSync('./ejdic-hand-utf8.txt')
const data = fs.readFileSync(path.join('config', 'ejdic-hand-utf8.txt'))

module.exports = String(data).split('\n').map((i) => {
  let line = i.split('\t')
  return {
    word: line[0],
    mean: line[1]
  }
})
