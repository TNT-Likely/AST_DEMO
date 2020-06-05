/*
 * @Author: xiaoxiao
 * @Date: 2020-06-05 15:19:16
 * @LastEditors: xiaoxiao
 * @LastEditTime: 2020-06-05 18:26:08
 * @Description: wepy转vue
 */ 
const path = require('path')
const fs = require('fs')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
const { Regex_Script, classToObject } = require('./tool')


/**
 * wepy转vue
 * @param {*} inputPath wepy文件路径
 * @param {*} outPath vue文件路径
 */
const transform = (inputPath, outPath) => {
    if (!fs.existsSync(inputPath)) {
        throw new Error(`找不到文件${inputPath}`)
    }

    /** wepy文件代码 */
    const sourceCode = fs.readFileSync(inputPath, {
        encoding: 'utf8'
    })

    /** wepy中的script部分 */
    const scriptCode = sourceCode.match(Regex_Script)[1]

    /** script部分的ast */
    const scriptAST = parse(scriptCode, {
        sourceType: 'module',
        plugins: [
            'classProperties'
        ]
    })

    /**
     * =====  AST转化 =====
     * 
     * step1:  去除 wepy 导入
     * 
     * step2:  class 转为 object
     * 
     * step3:  生命周期转化 onLoad 转为 
     * 
     * step4： 加上自动转化声明
     */
    traverse(scriptAST, {
        ImportDeclaration(path) {
            /** 导入路径 */
            const { value } = path.node.source

            /** step1: 去除wepy导入 */
            if (value === 'wepy') {
                path.remove()
            }
        },

        ClassDeclaration(path) {
            /** step2: class 申明替换为对象申明 */
            path.replaceWith(t.objectExpression(classToObject(path.node.body)))
        },

        ObjectMethod(path) {
            /**
             * step3: 生命周期转化 onLoad => mounted
             */
            const { key } = path.node
            
            if (key.name === 'onLoad') {
                key.name = 'mounted'
            }
        },

        
        Program(path) {
            /** step4: 添加自动转化申明 */
            path.node.body.unshift(t.BigIntLiteral(
            `/**
            * 以下内容为工具自动转化生成，请勿修改
            * ${new Date().toLocaleString()}
            */`.replace(/([\s]+\*)/gm, '\n*')
            ))
        }
    })

    /** 生成的vue源码 */
    const { code: vueCode } = generate(scriptAST, {
    })

    /** 生成vue文件的源代码 */
    const generateCode = sourceCode.replace(Regex_Script, `<script>\n${vueCode}\n</script>`)
    
    /** 写入vue文件 */
    fs.writeFileSync(outPath, generateCode)
    console.log('=== wepy已转化为vue ===')
}

module.exports = {
    transform
}