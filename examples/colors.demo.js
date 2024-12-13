const logsets = require("../src/")



const text = "Hello World"
console.log(text)
console.log(logsets.colors.red(text))
console.log(logsets.colors.green(text))
console.log(logsets.colors.yellow(text))
console.log(logsets.colors.blue(text))
console.log(logsets.colors.magenta(text))
console.log(logsets.colors.cyan(text))
console.log(logsets.colors.white(text))
console.log(logsets.colors.darkGray(text))
console.log(logsets.colors.black(text))
console.log(logsets.colors.dim(text))
console.log(logsets.colors.bright(text))

console.log(logsets.colors.bgYellow(text))
