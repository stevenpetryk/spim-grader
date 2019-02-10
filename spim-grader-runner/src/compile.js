const { exec } = require("child_process")
const fs = require("fs")

module.exports = function(program) {
  fs.writeFileSync("project.c", program)

  return new Promise((resolve, reject) => {
    exec("gcc -w project.c spimcore.c -o project.out", (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr })
      } else {
        resolve(stdout)
      }
    })
  })
}
