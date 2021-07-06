export function initLifecycle (vm) {
  const options = vm.$options
  let parent = options.parent
  let parent = options.parent

  // TODO: 找到最顶级的组件？
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }

    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

export function callHook (vm, hook) {
  pushTarget()

  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      // TODO: invokeWithErrorHandling?
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm.hasHookEvent) {
    vm.$emit('hook:' + hook)
  }

  popTarget()
}
