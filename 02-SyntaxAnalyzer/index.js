const { Type} = require('../01-LexicalAnalyzer/index')

/** 变量声明关键字 */
const VariableDeclaration = ['let', 'const', 'var']

const SyntaxAnalyzer = (tokens = []) => {
    /** 抽象语法树 */
    const AST = {
        type: 'Program',
        body: []
    }

    let current = 0

    /** 当前词 */
    let token = tokens[current]

    /** 存储语法树数组 */
    let body = []

    /** 指针后移 */
    const next = () => {
        do {
            current ++
            token = tokens[current] ? tokens[current] : {}
        } while(token.type === Type.WhiteSpace)
    }

    while(current < tokens.length) {
        /** 
         * 变量声明类 
         * '关键字' + '标识符' +  '运算符='  + '数字/标识符'
         * */
        if (VariableDeclaration.includes(token.value)) {
            let node = {
                type: 'VariableDeclarator'
            }

            next()

            if (token.type === Type.Identifier) {
               node.id = {
                   type: 'Identifier',
                   name: token.value
               }
            } else {
                throw new Error('Unexceptd type')
            }

            next()

            if (token.value !== '=') {
                throw new Error('Unexceptd type')
            }

            next()
            
            if (token.type  === Type.Number || token.type === Type.Identifier) {
                node.init = {
                    type: 'Literal',
                    value: token.value
                }
            }

            AST.body.push(node)

            next()
        }

    }

    return AST
}

module.exports = {
    SyntaxAnalyzer
}