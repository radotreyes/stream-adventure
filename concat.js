const concat = require(`concat-stream`)

/* given an input X, the output Y of a transform stream does not equal X
but is directly related to it by some transformation T
 *  Y(s) = T(s)X(s)
 */

// pipe a stream into the concat function
// concat listens for end of stream and
// joins all buffers it receives
// concat does NOT return another buffer, it accumulates buffers and
// processes them with a callback once the stream ends
// therefore you cannot pipe from concat
process.stdin.pipe(
  concat((buffer) => {
    process.stdout.write(
      buffer
        .toString()
        .split(``)
        .reverse()
        .join(``),
    )
    process.stdout.write(`\n`)
  }),
)
