const WebSocket = require("ws")
const { exec, spawn } = require("child_process")
const parseTap = require("./parseTap")
const shortid = require("shortid")

const EventEmitter = require("events")

class Connection extends EventEmitter {
  constructor(ws) {
    super()
    this.ws = ws
    this.uuid = shortid.generate()
    this.killed = false
  }

  start() {
    this.ws.on("message", (...args) => this.onMessage(...args))
    this.ws.on("close", () => this.killContainer())

    this.startContainer()
  }

  startContainer() {
    exec(`docker run -dit --name=${this.uuid} spim-grader-runner`, (error, stdout, stderr) => {
      if (error) {
        console.log("Container failed to start", stderr)
        this.send("container_failed", { error, stderr })
        this.ws.close()
        return
      }

      console.log("Container created", this.uuid)
      this.send("container_started", { containerId: this.uuid })
    })
  }

  onMessage(message) {
    const parsed = JSON.parse(message)

    switch (parsed.command) {
      case "compile":
        this.compile(parsed.program)
        break
      case "run":
        this.run()
        break
      case "stdin":
        this.stdinReceived(parsed.line)
        break
      default:
    }
  }

  killContainer() {
    console.log("Killing container", this.uuid)
    exec(`docker kill ${this.uuid}`, error => {
      if (!error) this.emit("containerKilled")
    })
  }

  send(event, payload = null) {
    return new Promise((resolve, reject) => {
      this.ws.send(JSON.stringify({ event: event, payload }), error => {
        if (error) {
          this.handleSendError(error)
          reject(error)
        }

        resolve()
      })
    })
  }

  sendError(event, payload = null) {
    this.ws.send(JSON.stringify({ event: event, error: true, payload }))
  }

  handleSendError(error) {
    if (!error.message.includes("not opened")) {
      console.error(error, this.ws.readyState)
    }
  }

  compile(program) {
    this.execOnContainer(
      `compile ${Buffer.from(program).toString("base64")}`,
      (error, stdout, stderr) => {
        if (error) {
          this.sendError("compilation_failed", { error, stdout, stderr })
        } else {
          this.send("compilation_succeeded", { stdout })
            .then(() => this.test())
            .then(() => this.run())
        }
      },
    )
  }

  test() {
    this.execOnContainer("test", (error, stdout, stderr) => {
      if (error) {
        this.sendError("tests_failed", { stderr })
      } else {
        parseTap(stdout).then(parsed => this.send("tests_succeeded", parsed))
      }
    })
  }

  run() {
    if (this.runProcess) {
      this.runProcess.kill()
    }

    this.runProcess = this.spawnOnContainer("run")
    this.runProcess.stdout.on("data", data => {
      this.send("stdout_received", { data: data.toString() })
    })
    this.runProcess.on("close", event => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.sendError("process_killed", { error: event })
      }

      this.runProcess = null
    })
  }

  stdinReceived(line) {
    if (!this.runProcess) {
      this.sendError("no_process_for_stdin")
      return
    }

    this.runProcess.stdin.write(line)
  }

  execOnContainer(command, callback) {
    exec(`docker exec ${this.uuid} node src/index.js ${command}`, callback)
  }

  spawnOnContainer(command) {
    return spawn("docker", ["exec", "-i", this.uuid, "npm", "start", "--silent", "--", command])
  }
}

module.exports = Connection
