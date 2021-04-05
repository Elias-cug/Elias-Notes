# promiseA+规范

## 俗语

1. 有then方法的对象或函数
2. thenable 是一个有then方法的对象或者函数
3. value promise状态成功时的值，resolve(value)，value 类型不限
4. reason promise失败时的值，reject(reason)
5. exception 使用throw抛出的异常

## 规范

### Promise states

三种状态

1. pending

    1.1 初始状态，可以改变

    1.2 通过resolve --> fulfilled状态

    1.3 通过reject --> rejected状态

2. fulfiled

   2.1 最终态

   2.2 必须有一个 value 值

3. rejected

   3.1 最终态

   2.2 必须拥有一个 reason

### then

promise 应该提供一个 then 方法，用来访问最终结果，无论是 value 还是 reason

```js
promsie.then(onFulfilled, onRejected)
```

1. 参数规范

   1.1 必须是函数类型，如果传入的不是函数，被忽略（给默认值）

2. onFulfilled 特性

   2.1 在 promise 变成 fulfilled，应该调用 onFulfilled， 参数是 value。--》onFulfilled的执行时机

   2.2  只能被调用一次（怎么实现只调用一次）

3. onRejected特性

   3.1 --

   3.2 --

4. onFulfilled 和 onRejected 应该是微任务阶段执行

   实现 promise 的时候，如何生成微任务？

5. then方法可以被调用多次

   5.1 promise 状态，变为 fulfilled 回调都需要按照注册的顺序执行，也可以理解为按照 .then 的顺序执行

   5.2 --

6. 返回值

  then应该返回一个 promise

   6.1 onFulfilled 或 onRejected 执行结果，调用 resolvePromise

   6.2 onFulfilled 或 onRejected 执行过程被抛出异常，被reject

   6.3 如果 onFulfilled 不是一个函数，promise2 以 promise2 的value 触发fulfilled

7. resolvePromise
