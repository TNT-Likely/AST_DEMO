const { TestCode, LexicalAnalyzer } = require('../01-LexicalAnalyzer/index')
const { SyntaxAnalyzer } = require('./index')

const tokens = LexicalAnalyzer(TestCode)
console.log('=== 语法解析结果如下 ===')
console.log(SyntaxAnalyzer(tokens))