const fs = require('fs')
const { spawn } = require('child_process')

module.exports = function () {
  const project = spawn('./project.out', ['input_file.asc'])

  project.stdout.pipe(process.stdout)
  process.stdin.pipe(project.stdin)

  process.stdin.on('data', () => performHealthCheck())
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
