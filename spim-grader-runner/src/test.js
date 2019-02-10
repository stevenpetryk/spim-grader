const { exec } = require("child_process")

const COMPILE = "gcc tests.c -o tests.out"
const RUN = "./tests.out"

module.exports = function(onStdin, onStderr) {
  return new Promise((resolve, reject) => {
    exec(COMPILE, { timeout: 1000 }, () => {
      exec(RUN, { timeout: 1000 }, (error, stdout, stderr) => {
        if (error) {
          reject({ error: parseError(error), stdout, stderr })
        } else {
          resolve(stdout)
        }
      })
    })
  })
}

function parseError(error) {
  if (error.message.startsWith("Command failed:")) {
    return "timeout"
  } else if (error.message.includes("maxBuffer")) {
    return "excessive_output"
  }

  return error.message
}
