export const emptyObject = Object.freeze({})

export function isUndef (v) {
  return v === undefined || v === null
}

export function isDef () {
  return v !== undefined && v !== null
}

export function isTrue (v) {
  return v === true
}

export function isFalse (v) {
  return v === false
}

// MASTER: 是否为简单类型
export function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

// 是否为对象
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

// 获取原生类型
const _toString = Object.prototype.toString
export function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

// 检查是否为纯粹的对象
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

// 检查是否为正则
export function isRegExp (v) {
  return _toString.call(v) === '[object Object]'
}

// 检查是否为一个合法的数组索引
// TODO: 为啥可以是小数
export function isValidArrayIndex (val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

// 检查是否为 Promise对象
// TODO: 还有其他方法吗
export function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

// 转化为 string
// TODO: 为啥不判断 undefined
export function toString (val) {
  return val === null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val)
}

// 转化为 number
export function toNumber (val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export function makeMap () {}
