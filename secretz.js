const { createDecipher, createHash } = require(`crypto`)
const tar = require(`tar`)
const { createGunzip } = require(`zlib`)
const concat = require(`concat-stream`)

// parser object which outputs a ReadWriteStream
const parser = new tar.Parse()

// eslint-disable-next-line
parser.on(`entry`, e => {
  // early return and resume stream throughput
  if (e.type !== `File`) return e.resume()

  // define output hash function
  const md5 = createHash(`md5`, { encoding: `hex` })

  // pipe event contents into md5 hash and output a concat string to console
  e.pipe(md5).pipe(
    concat((hash) => {
      console.log(`${hash} ${e.path}`)
    }),
  )
})

const cipher = process.argv[2]
const pw = process.argv[3]
process.stdin
  .pipe(createDecipher(cipher, pw))
  .pipe(createGunzip())
  .pipe(parser)
