export class Vue {
  constructor (options = {}) {
    this.$options = options
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el
    this.$data = options.data
    this.$methods = options.methods

    // $data的属性代理到 this 上
    this.proxy(this.$data)

    // observe
    new Observer(this.$data)

    // Observer
    new Compiler(this)
  }

  proxy (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          return data[key]
        },
        set (newValue) {
          // window 的 isNaN 和 Number.isNaN 行为不一样
          if (data[key] === newValue || __isNaN(data[key], newValue)) return
          data[key] = newValue
        }
      })
    })
  }
}

// 依赖收集
class Dep {
  constructor () {
    this.deps = new Set()
  }
  // 收集副作用代码
  add (dep) {
    if (dep && dep.update) this.deps.add(dep)
  }

  // 通知
  notify () {
    this.deps.forEach(dep => dep.update())
  }
}

// watcher
class Watcher {
  // vm： vue实例
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.__old = vm[key] // 存初始值， 触发 getter
    Dep.target = null
  }
  update () {
    let newValue = this.vm[this.key]
    if (this.__old === newValue || __isNaN(newValue, this.__old)) return
    this.cb(newValue)
  }
}

// observer
class Observer {
  constructor (data) {
    this.walk(data)
  }
  walk (data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]))
  }
  defineReactive (obj, key, value) {
    let that = this
    this.walk(value)

    let dep = new Dep()

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get () {
        Dep.target && dep.add(Dep.target)
        return value
      },
      set (newValue) {
        if (value === newValue || __isNaN(value, newValue)) return
        value = newValue
        that.walk(newValue)
        dep.notify()
      }
    })
  }
}

// complier
class Compiler {
  constructor (vm) {
    this.el = vm.$el
    this.vm = vm
    this.methods = vm.$methods

    this.compile(vm.$el)
  }
  compile (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      if (node.childNodes && node.childNodes.length) this.compile(node)
    })
  }

  isTextNode (node) {
    return node.nodeType === 3
  }

  isElementNode (node) {
    return node.nodeType === 1
  }

  compileElement (node) {
    if (node.attributes.length) {
      Array.from(node.attributes).forEach(attr => {
        let attrName = attr.name
        if (this.isDirective(attrName)) {
          attrName =
            attrName.indexOf(':') > -1 ? attrName.substr(5) : attrName.substr(2)
          let key = attr.value
          this.update(node, key, attrName, this.vm[key])
        }
      })
    }
  }

  compileText (node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      new Watcher(this, key, val => {
        node.textContent = val
      })
    }
  }

  update (node, key, attrName, value) {
    if (attrName === 'text') {
      node.textContent = value
      new Watcher(this.vm, key, val => {
        node.textContent = val
      })
    } else if (attrName === 'model') {
      node.value = value
      new Watcher(this.vm, key, val => {
        node.value = val
      })
      node.addEventListener('input', () => {
        this.vm[key] = node.value
      })
    } else if (attrName === 'click') {
      node.addEventListener(attrName, this.methods[key].bind(this.vm))
    }
  }

  isDirective (str) {
    return str.startsWith('v-')
  }
}

function __isNaN (value, newValue) {
  return Number.isNaN(value) || Number.isNaN(newValue)
}
