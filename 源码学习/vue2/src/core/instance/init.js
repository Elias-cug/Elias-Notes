// TODO: uid?
let uid = 0

// vue初始化
// 1. 合并配置
// 2. 暴露自己到 _self
// 3. 初始化生命周期
// 4.
export function initMixin (Vue) {
  // 初始化函数， 实例化 vue调用
  Vue.prototype._init = function (options) {
    const vm = this

    this.uid = uid++

    vm._isVue = true

    // 合并配置项：
    // TODO: _isComponent ？
    if (options && options._isComponent) {
      // TODO: initInternalComponent ?
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    vm._self = vm

    // 初始化生命周期
    initLifecycle(vm)
    // 初始化事件？
    initEvents(vm)

    // TODO: initRender?
    initRender(vm)

    callHook(vm, 'beforeCreate')

    // TODO: initInjections?
    initInjections(vm)

    initState(vm)

    initProvide(vm)

    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

// TODO: 干啥的呢？
export function initInternalComponent (vm, options) {
  const opts = (vm.$options = Object.create(vm.constructor.options))

  const parentVnode = options._parentVnode

  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.vNodeComponentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._compomemtTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

// TODO: 都是合并哪里来的配置呢？
export function resolveConstructorOptions (Ctor) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions

      const modifiedOptions = resolveModifiedOptions(Ctor)

      if (modifiedOptions) {
        extend(Ctor.extendOPtions, modifiedOptions)
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOPtions)

      if (options.name) {
        options.component[options.name] = Ctor
      }
    }
  }
  return options
}

// TODO: 啥时候会触发
function resolveModifiedOptions (Ctor) {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions

  for (key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }

  return modified
}
