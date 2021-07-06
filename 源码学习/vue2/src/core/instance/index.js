import { initMixin } from './init'

// 定义 vue 函数，用来 new
function Vue (options) {
  this._init(options)
}

initMixin(Vue)
