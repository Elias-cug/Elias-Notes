import { warn } from './debug'

import { observe, toggleObserving, shouldObserve } from '../observer/index'

import {
  hasOwn,
  isObject,
  toRawType,
  hyphenate,
  capitalize,
  isPlainObject
} from '../../shared/util'

/**
 * 校验prop
 * @param { String } key
 * @param { Object } propOptions 子组件 props 配置
 * @param { Object } propsData 父组件传入的值
 * @param { Component } vm
 */
export function validateProp (key, propOptions, propsData, vm) {
  // 子组件的一个 prop
  const prop = propOptions[key]

  // 父组件是不是没有传入子组件需要的 prop
  const absent = !hasOwn(propsData, key)

  // 父组件 传入 的 prop 的值
  let value = propsData[key]

  const booleanIndex = getTypeIndex(Boolean, prop.type)
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false
    } else if (value === '' || value === hyphenate(key)) {
      const stringIndex = getTypeIndex(String, prop.type)
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true
      }
    }
  }
}

if (value === undefined) {
  value = getPropDefaultValue(vm, prop, key)
}

const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/
/**
 *
 * @param {any} value
 * @param {Function} type
 * @param {component} vm
 */
function assertType (value, type, vm) {
  let valid
  const expectedType = getType(type)
  if (simpleCheckRE.test(expectedType)) {
    const t = typeof value
    valid = t === expectedType.toLowerCase()

    if (!valid && t === 'object') {
      valid = value instanceof type
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value)
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value)
  } else {
    try {
      valid = value instanceof type
    } catch (e) {
      warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm)
      valid = false
    }
  }
  return {
    valid,
    expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
const functionTypeCheckRE = /^\s*function (\w+)/
function getType (fn) {
  const match = fn && fn.toString().match(functionTypeCheckRE)
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

/**
 * 获取某一类型在期望类型中的索引
 * @param {*} type
 * @param {*} expectedTypes
 * @returns
 */
function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (let i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/**
 *
 * @param {} name
 * @param {*} value
 * @param {*} expectedTypes
 */
function getInvalidTypeMessage (name, value, expectedTypes) {
  let message =
    `Invalid prop: type check failed for prop ${name}.` +
    `Expected ${expectedTypes.map(capitalize).join(', ')}`
  const expectedType = expectedTypes[0]
  const receivedType = toRawType(value)
  if (
    expectedTypes.length === 1 &&
    isExplicable(expectedType) &&
    isExplicable(typeof value) &&
    !isBoolean(expectedType, receivedType)
  ) {
    message += ` with value ${styleValue(value, expectedType)}`
  }
  message += `, got ${receivedType} `
  if (isExplicable(receivedType)) {
    message += `with value ${styleValue(value, receivedType)}`
  }
}

// 按类型风格化值
function styleValue (value, type) {
  if (type === 'String') {
    return `"${value}"`
  } else if (type === 'Number') {
    return `${Number(value)}`
  } else {
    return `${value}`
  }
}

// 检测是否为可解释类型
const EXPLICABLE_TYPES = ['string', 'number', 'boolean']
function isExplicable (value) {
  return EXPLICABLE_TYPES.some(elem => value.toLowerCase() === elem)
}

// 检测传参中是否有 Boolean 类型
function isBoolean (...args) {
  return args.some(elem => elem.toLowerCase() === 'boolean')
}
