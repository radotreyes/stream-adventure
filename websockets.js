const trumpet = require(`trumpet`)
const through = require(`through2`)

const tr = trumpet()
// `trumpet` creates a transform stream from a CSS selector

// stdin | tr
process.stdin.pipe(tr)

// select html
const html = tr.select(`.loud`).createStream()

// define through stream
const write = function (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase())
  next()
}

// pipe to stdout
html.pipe(through(write)).pipe(process.stdout)
