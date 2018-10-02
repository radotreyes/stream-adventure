const trumpet = require(`trumpet`)
const through = require(`through2`)

const tr = trumpet()
// `trumpet` creates a transform stream from a CSS selector

// stdin | tr
process.stdin.pipe(tr)

// define through stream
const write = function (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase())
  next()
}

// pipe to stdout
tr.pipe(process.stdout)

// writing to a trumpet stream replaces the innerHtml of the matched element
const html = tr.select(`.loud`).createStream()
html.pipe(through(write)).pipe(html)
