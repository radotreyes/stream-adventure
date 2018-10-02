const { createServer } = require(`http`)
const through = require(`through2`)

const write = function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase())
  next()
}

const server = createServer((req, res) => {
  if (req.method === `POST`) {
    req.pipe(through(write)).pipe(res)
  }
})

server.listen(process.argv[2])
