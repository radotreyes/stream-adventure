const { spawn } = require(`child_process`)
const duplex = require(`duplexer2`)

module.exports = function (command, argv) {
  const child = spawn(command, argv)
  return duplex(child.stdin, child.stdout)
}
