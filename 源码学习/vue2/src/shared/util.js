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

// 创建一个集合，返回一个函数：检查key是否在当前集合
export function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0, len = list.length; i < len; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}

// 检查是否是内置标签
export const isBuiltInTag = makeMap('slot, component', true)

// 检查是预留属性
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

// 删除数组中的一项
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// 检测对象是否有指定属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

// 创建一个可缓存值的函数
export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    console.log('str', str)
    console.log('hit', hit)
    return hit || (cache[str] = fn(str))
  }
}

// 连字符转化为小驼峰  eg: aa-bb --> aaBb
const camelizeRE = /-(\w)/g
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

// 首字母大写 eg: banana --> Banana
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

// 连字符连接大写 eg: isBanana --> is-banana
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

// bind函数的 polyfill
// MASTER: ployfillBind
function ployfillBind (fn, ctx) {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

export const bind = Function.prototype.bind ? nativeBind : ployfillBind

// 类数组转化为数组
export function toArray (list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

// 混入属性到目标对象
export function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

// 合并数组对象到一个对象
export function toObject (arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

// 一个空函数
// 比如当插件提供了一个可选的回调函数接口，那么如果调用的时候没有传递这个回调函数，就用$.noop来代替执行。
export function noop () {}

// 返回 false 的函数
export const no = () => false

// 返回相同的值
export const identity = _ => _

// TODO: genStaticKeys?
export function genStaticKeys (moudles) {
  return moudles
    .reduce((keys, m) => {
      return keys.concat(m.staticKeys || [])
    }, [])
    .join(',')
}

// 宽松的相等
export function looseEqual (a, b) {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i])
          })
        )
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key])
          })
        )
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

// 返回宽松相等的第一个元素索引
export function looseIndexOf (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

// 函数只被调用一次
export function once (fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
