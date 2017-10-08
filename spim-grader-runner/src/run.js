const fs = require('fs')
const { spawn } = require('child_process')
const pty = require('node-pty')

module.exports = function () {
  const term = pty.spawn('./project.out', ['input_file.asc'])

  term.on('data', (data) => process.stdout.write(data))
  process.stdin.on('data', (data) => term.write(data))

  // process.stdin.on('data', () => performHealthCheck())
}

function performHealthCheck () {
  setTimeout(() => {
    const lastHealthyAt = parseInt(fs.readFileSync('./healthcheck.txt').toString().trim(), 10)
    const now = Math.floor(new Date().getTime())

    if (isNaN(lastHealthyAt) || Math.abs(lastHealthyAt - now) > 75) {
      process.stderr.write('healthcheck failed\n')
      process.exit(1)
    }
  }, 50)
}
