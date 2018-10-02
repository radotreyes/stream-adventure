const through = require(`through2`)

/** given an input X, the output Y of a transform stream does not equal X
but is directly related to it by some transformation T
 *  Y(s) = T(s)X(s)
 */

// called for every buffer of available input
// "iterates" over the stream by storing chunks into fixed-size buffers and
// performing some encoding
const write = function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase()) // push transformed buffer to write stream
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
