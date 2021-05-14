/**
 * 1. 监听 hash 切换
 * 2. 注册路由
 * 3. 路由切换执行路由逻辑
 */

class Hash {
  constructor () {
    this.routes = {}
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh)
    window.addEventListener('hashchange', this.refresh)
  }

  /** 注册路由 */
  route (path, cb) {
    this.routes[path] = cb || function () {}
  }

  /** 页面刷新 */
  refresh () {
    const path = `/${location.hash.slice(1) || ''}`
    this.routes[path]()
  }
}

const body = document.querySelector('body')

function changeBgColor (color) {
  body.style.backgroundColor = color
}

const Router = new Hash()

Router.route('/', function () {
  changeBgColor('white')
})
Router.route('/green', function () {
  changeBgColor('green')
})
Router.route('/gray', function () {
  changeBgColor('gray')
})
