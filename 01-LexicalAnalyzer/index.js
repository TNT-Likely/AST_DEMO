/** 测试代码 */
const TestCode = 'const a = 1'

/** 词法正则枚举 */
const Regx = {
    /** 标识符 */
    Identifier: /[a-zA-Z\$\_]/,

    /** 空白 */
    WhiteSpace: /\s/,

    /** 运算符 */
    Operator: /=|\+|-|\*|\/|>|</,

    /** 数字 */
    Number: /\d/,

    /** 分隔符 */
    Separator: /,|{|}|(|)|/
}

/** 词法类型枚举 */
const Type = {
    Identifier: 'identifier',
    WhiteSpace: 'whitespace',
    Operator: 'operator',
    Number: 'number',
    Separator: 'separtor',
    KeyWord: 'keyword',
    Unknow: 'unknow',
}

/** 保留字 */
const Keywords = ['let', 'const', 'class']

const LexicalAnalyzer = (code = '') => {
    /** 存储 词 的数组 */
    const tokens = []

    /** 指针 */
    let current = 0

    while(current < code.length) {
        /** 当前指针指向的字符 */
        const char = code[current]

        /** 处理标识符类 */
        if(Regx.Identifier.test(char)) {
            let value = ''
            value += char
            current ++
            while(Regx.Identifier.test(code[current]) && current < code.length) {
                value += code[current]
                current++
            }

            tokens.push({
                type: Keywords.includes(value) ? Type.KeyWord : Type.Identifier,
                value
            })

            continue
        }

        /** 处理空白字符 */
        if(Regx.WhiteSpace.test(char)) {
            let value = ''
            value += char
            current ++
            while(Regx.WhiteSpace.test(code[current]) && current < code.length) {
                value += code[current]
                current++
            }

            tokens.push({
                type: Type.WhiteSpace,
                value
            })

            continue
        }

        /** 处理运算符 */
        if(Regx.Operator.test(char)) {
            let value = ''
            value += char
            current ++
            while(Regx.Operator.test(code[current]) && current < code.length) {
                value += code[current]
                current++
            }

            tokens.push({
                type: Type.Operator,
                value
            })

            continue
        }

        /** 数字处理 */
        if(Regx.Number.test(char)) {
            let value = ''
            value += char
            current ++
            while(Regx.Number.test(code[current]) && current < code.length) {
                value += code[current]
                current++
            }

            tokens.push({
                type: Type.Number,
                value
            })

            continue
        }

        /** 分隔符处理 */
        if(Regx.Separator.test(char)) {
            current ++

            tokens.push({
                type: Type.Separator,
                value: char
            })

            continue
        }

        tokens.push({
            type: Type.Unknow,
            value: char
        })

    }

    return tokens
}

module.exports = {
    LexicalAnalyzer,
    TestCode,
    Regx,
    Type
}