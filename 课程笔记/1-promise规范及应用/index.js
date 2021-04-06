const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  // 成功的回调
  FULFILLED_CALLBACK_LIST = []
  // 失败的回调
  REJECTED_CALLBACK_LIST = []
  // 状态
  _status = PENDING
  constructor (fn) {
    // 定义初始状态
    this.status = PENDING
    // 成功时的值
    this.value = null
    // 失败时候的值
    this.reason = null

    try {
      // TODO: 理解 bind
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  get status () {
    return this._status
  }

  set status (newStatus) {
    this._status = newStatus
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback(this.value)
        })
        break
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(callback => {
          callback(this.reason)
        })
        break
      }
    }
  }

  resolve (value) {
    if (this.status === PENDING) {
      this.value = value
      this.status = FULFILLED
    }
  }

  reject (reason) {
    if (this.status === PENDING) {
      this.reason = reason
      this.status = REJECTED
    }
  }

  then (onFulfilled, onRejected) {
    // 边界处理 非 function 转化为 function
    const fulfilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : value => value
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : reason => {
          throw reason
        }

    // 7.1 处理异常
    const fulFilledFnWithCatch = (resolve, reject) => {
      try {
        // 7.2
        if (!this.isFunction(onFulfilled)) {
          resolve(this.value)
        } else {
          // 7.5
          const x = fulfilledFn(this.value)
          this.resolvePromise(newPromsie, x, resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    }

    const rejectedFnWithCatch = (resolve, reject) => {
      try {
        // 7.3
        if (!this.isFunction(onRejected)) {
          reject(this.reason)
        } else {
          // 7.5
          const x = rejectedFn(this.reason)
          this.resolvePromise(newPromsie, x, resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    }

    // 不同状态的执行逻辑
    switch (this.status) {
      case FULFILLED: {
        const newPromise = new MyPromise((resolve, reject) =>
          fulFilledFnWithCatch(resolve, reject, newPromise)
        )
        return newPromise
      }
      case REJECTED: {
        const newPromise = new MyPromise((resolve, reject) =>
          rejectedFnWithCatch(resolve, reject, newPromise)
        )
        return newPromise
      }
      case PENDING: {
        const newPromise = new MyPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(() =>
            fulFilledFnWithCatch(resolve, reject, newPromise)
          )
          this.REJECTED_CALLBACK_LIST.push(() =>
            fulFilledFnWithCatch(resolve, reject, newPromise)
          )
        })
        return newPromise
      }
    }
  }

  resolvePromise (newPromise, x, resolve, reject) {}

  isFunction (params) {
    if (typeof params === 'function') {
      return true
    }
    return false
  }
}
