const { parse } = require('@babel/parser')

const TestCode = `const a = 1`

console.log(parse(TestCode))