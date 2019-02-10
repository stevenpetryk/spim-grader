const TAPParser = require("tap-parser")
const { Readable } = require("stream")

module.exports = function(output) {
  return new Promise((resolve, reject) => {
    const parser = new TAPParser({ passes: true }, result => {
      resolve(result)
    })

    const stream = new Readable()
    stream.push(output)
    stream.push(null)
    stream.pipe(parser)
  })
}
