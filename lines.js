const through = require(`through2`)

/* given an input X, the output Y of a transform stream does not equal X
but is directly related to it by some transformation T
 *  Y(s) = T(s)X(s)
 */

let lineCount = 0
const write = function write(buffer, encoding, next) {
  const method = lineCount % 2 ? `toUpperCase` : `toLowerCase`
  this.push(`${buffer.toString()[method]()}`)
  lineCount += 1
  next() // grab the next buffer
}

// called at end of stream
const end = function end(done) {
  done() // indicate that the stream has terminated
}

// create through stream
const stream = through(write, end)

// pipe data from stdin to stdout
process.stdin.pipe(stream).pipe(process.stdout)
