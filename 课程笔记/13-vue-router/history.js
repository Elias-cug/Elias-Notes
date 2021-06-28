/**
 * 1. 收集路由，及路由回调
 * 2. 路由切换时要调用回调函数
 * 3. 监听路由切换
 */

class History {
  constructor () {
    this.routes = {}

    this.init(location.pathname)
    this._bindPopstate()
  }

  init (path) {
    window.history.replaceState({ path }, null, path)

    const cb = this.routes[path]

    cb && cb()
  }

  route (path, cb) {
    this.route[path] = cb || function () {}
  }

  pushState (path) {
    window.history.pushState({ path }, null, path)
    const cb = this.routes[path]
    cb && cb()
  }

  _bindPopstate () {
    window.addEventListener('popstate', e => {
      const state = e.state && e.state.path
      console.log(`in popstate listener path=${path}`)
      this.routes[path] && this.routes[path]()
    })
  }
}

const Router = new History()

const body = document.querySelector('body')
const container = document.querySelector('.container')

function changeBgColor (color) {
  body.style.backgroundColor = color
}

Router.route('/', function () {
  changeBgColor('white')
})
Router.route('/gray', function () {
  changeBgColor('gray')
})
Router.route('/green', function () {
  changeBgColor('green')
})

container.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault()
    Router.pushState(e.target.getAttribute('href'))
  }
})
