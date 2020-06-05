const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')

const TestCode = `
    const a = n => {

    }
`

const ast = parse(TestCode, {
    sourceType: 'module'
})

console.log(JSON.stringify(ast))

traverse(ast, {
    ArrowFunctionExpression(path) {
        path.node.type = 'FunctionExpression'
    }
})

const { code } = generate(ast)

console.log('=== 生成的code如下 ===')
console.log(code)