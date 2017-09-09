process.stdin.setEncoding('utf8')

const compile = require('./compile')
const test = require('./test')
const run = require('./run')

const command = process.argv[2]

switch (command) {
  case 'compile':
    let program = Buffer.from(process.argv[3], 'base64').toString()
    console.log(program)

    compile(program).catch(({ stderr }) => writeFailure(stderr))
    break
  case 'test':
    test()
      .then((output) => writeSuccess(output))
      .catch(({ error }) => {
        writeFailure(error)
      })
    break
  case 'run':
    run()
    break
  default:
    process.stderr.write(`unrecognized command ${command}`)
    process.exit(1)
}

function writeSuccess (output) {
  process.stdout.write(output)
}

function writeFailure (error) {
  process.stderr.write(error)
  process.exit(1)
}
