const duplex = require(`duplexer`)
const through = require(`through`)

module.exports = function (counter) {
  let counts = {}
  return duplex(through(recordCount, setCount), counter)

  function recordCount(obj) {
    const country = obj.country
    const count = counts[country] || 0
    counts[country] = count + 1
  }

  function setCount() {
    counter.setCounts(counts)
    counts = {}
  }
}
