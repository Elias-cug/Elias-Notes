function isObject (data) {
  return data && typeof data === 'object'
}

let targetMap = new WeakMap()
let activeEffect

// 依赖收集
function track (target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, (depsMap = new Map()))
  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  if (!dep.has(activeEffect)) dep.add(activeEffect)
}

// 通知
function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  depsMap.get(key).forEach(e => {
    e && e()
  })
}

function effect (fn, options = {}) {
  const __effect = function (...args) {
    activeEffect = __effect
    return fn(...args)
  }

  if (!options.lazy) {
    __effect()
  }

  return __effect
}

export function reactive (data) {
  if (!isObject(data)) return
  return new Proxy(data, {
    get (target, key, receiver) {
      // 反射
      const ret = Reflect.get(target, key, receiver)
      // 收集
      track(target, key)
      return isObject(ret) ? reactive(ret) : ret
    },
    set (target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return true
    },
    deleteProperty (target, key, receiver) {
      const ret = Reflect.deleteProperty(target, key, receiver)
      //  通知
      trigger(target, key)
      return ret
    }
  })
}

// 基本类型 --》proxy 对基本类型无效
export function ref (target) {
  let value = target
  const obj = {
    get value () {
      track(obj, 'value')
    },
    set value (newValue) {
      if (value === newValue) {
        value = newValue
        trigger(obj, 'value')
      }
    }
  }
  return obj
}

export function computed (fn) {
  let __computed
  const run = effect(fn, { lazy: true })
  __computed = {
    get value () {
      return run()
    }
  }
  return __computed
}

export function mount (instance, el) {
  effect(function () {
    instance.$data && update(instance, el)
  })

  instance.$data = instance.setup()
  update(instance, el)
  function update (instance, el) {
    el.innerHTML = instance.render()
  }
}
