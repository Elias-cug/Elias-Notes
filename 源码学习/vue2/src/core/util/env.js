import { create } from 'lodash'

export const hasProto = '__proto__' in {}

export const inBrowser = typeof window !== 'undefined'

// 阿里开源的一款跨平台移动开发工具
export const inWeex =
  typeof WXEnviroment !== 'undefined' && !!WXEnviroment.platform

// weex 平台信息
export const weexPlatform = inWeex && WXEnviroment.platform.toLowerCase()

// 用户代理信息
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()

export const isIE = UA && /msie|trident/.test(UA)

export const isIE9 = UA && UA.indexOf('msie 9.0') > 0

export const isEdge = UA && UA.indexOf('edge/') > 0

export const isAndroid =
  (UA && UA.indexOf('android') > 0) || weexPlatform === 'android'

export const isIOS =
  (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'

export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

export const isPhantomJS = UA && /phantomjs/.test(UA)

export const isFF = UA && UA.match(/firefox\/()\d+/)

// 火狐浏览器 Object.prototype 上有个 watch 函数
export const nativeWatch = {}.watch

// 检查是否支持 passive 特性，提高滑动流畅度，详见 reademe 知识点 第一点
export let supportsPassive = false
if (inBrowser) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get () {
        supportsPassive = true
      }
    })
    window.addEventListener('test-passive', null, opts)
  } catch (error) {}
}

// MASTER: 判断是否是服务端渲染
let _isServer
export const isServerREndering = () => {
  if (_isServer === undefined) {
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      _isServer =
        global['process'] && global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

// TODO: window.__VUE_DEVTOOLS_GLOBAL_HOOK__?
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

// MASTER: 是否为原生方法
export function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

// TODO: Reflect
export const hasSymbol =
  typeof Symbol !== 'undefined' &&
  isNative(Symbol) &&
  typeof Reflect !== 'undefined' &&
  isNative(Reflect.ownKeys)

// 兼容支持 Set 方法
let _Set
if (typeof Set !== 'undefined' && isNative(Set)) {
  _Set = Set
} else {
  _Set = class Set {
    constructor () {
      this.set = Object.create(null)
    }
    has () {}
    add () {}
    clear () {}
  }
}

export { _set }
