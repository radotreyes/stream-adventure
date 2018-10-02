/**
 * creates a pipeline from a list of streams
 * then returns a single stream that exposes the first stream as the writable side
 * and the last stream as the readable side
 * with all other streams inbetween
 */

const combine = require(`stream-combiner`)
const split = require(`split`)
const through = require(`through2`)
const { createGzip } = require(`zlib`)

module.exports = function combiner() {
  /* combine newline-separated json groups books into genres, then gzip output */
  let currentGenre
  function write(buffer, _, next) {
    // transform function
    if (!buffer.length) return next()
    const member = JSON.parse(buffer)

    if (member.type === `genre`) {
      // push the string version of the current genre to the through stream
      if (currentGenre) this.push(`${JSON.stringify(currentGenre)}\n`)

      // if we run into a genre, then the previous genre must be finished
      currentGenre = { name: member.name, books: [] }
    } else if (member.type === `book`) {
      currentGenre.books.push(member.name)
    }

    return next()
  }

  function end(next) {
    // push the last line to its appropriate location
    if (currentGenre) this.push(`${JSON.stringify(currentGenre)}\n`)
    next()
  }

  return combine(split(), through(write, end), createGzip())
}
