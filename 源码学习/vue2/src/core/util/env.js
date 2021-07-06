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
