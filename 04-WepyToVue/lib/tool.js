/*
 * @Author: xiaoxiao
 * @Date: 2020-06-05 15:22:53
 * @LastEditors: xiaoxiao
 * @LastEditTime: 2020-06-05 17:25:58
 * @Description: 工具类
 */ 

const t = require('@babel/types')
/**
 * 类型校验
 * @param {*} type 期待类型
 * @param {*} obj 源数据
 */
const checkType = (type, obj) => {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
}

/** 匹配出wepy中的script部分 */
const Regex_Script = /<script>([\s\S]+?)<\/script>/

/**
 * class AST 转化为 object AST
 * @param {*} classBody class的首相语法树
 */
const classToObject = (classBody = []) => {
    classBody = classBody.body.map(i => {
        /**
         * classbody 内容有多种类型，例如 class property 、class method ...
         * 
         * 其他类型暂不处理
         */

        if (t.isClassProperty(i)) {
            /**
             * class property 转化为
             */
            return t.objectProperty(i.key, i.value)
        } else if(t.isClassMethod(i)) {
            return t.objectMethod(i.kind, i.key, i.params, i.body)
        } else {
            throw new Error(`无法处理的类型${i.type}`)
        }
    })

    return classBody
}

module.exports = {
    checkType,
    Regex_Script,
    classToObject
}