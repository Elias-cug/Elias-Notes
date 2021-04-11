## 实现 Promise

1. 用 Class 实现 Promise

2. 定义三种状态

3. value reason 初始化

4. 实现 resolve reject 方法

   4.1 resolve

   1. 入参： value
   2. 实现：更新状态 pending --> fulfilled；更新 value 值
   3. 返回：void

   4.2 reject

   1. 入参：reason
   2. 实现：更新状态 pending --> rejected
   3. 返回：void

5. 入参函数的处理

   1. 传参： resolve reject
   2. 实现：用户逻辑
   3. 返回：Promise 对象
   4. 执行时机：初始化 Promise 就要执行
   5. 异常处理：有任何报错需要 reject 抛出去

6. 实现 then 方法

   1. 传参：onFulfilled onRejected

   传参边界：如果不是函数，忽略，原样返回 value / reason

   2. 实现：根据不同的状态 执行 onFulfilled / onRejected / 推入数组

   FULFILLED: 执行 onFulfilled

   REJECTED: 执行 onRejected

   PENDING: 分别推入数组 --> 当 status 改变时依次执行

   3. 返回：见下一节

7. then 返回值处理

   7.1 规范 1：如果 onFulfilled / onRejected 抛出异常 e ，则 promise2 (promise2 = promise1.then(onFulfilled, onRejected)) 必须拒绝执行，并返回拒因 e

   7.2 规范 2：如果 onFulfilled 不是函数且 promise1 执行成功，promise2 必须成功执行并返回相同的值

   7.3 规范 3：如果 onRejected 不是函数且 promise2 拒绝执行，promise2 必须拒绝执行并返回相同的据因

   7.4 规范 4：如果 promise1 的 onRejected 执行成功了，promise2 应该被 resolve // TODO: 怎么表现

   7.5 规范 5：如果 onFulfilled / onRejected 返回一个值 x，则运行 resolvePromise 方法

8. 实现 resolvePromise 方法

   8.1 规范 1：如果 newPromise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 newPromise；防止死循环

   8.2 规范 2：如果 x 是一个 Promise
   
   - 如果 x 为 Promise ，则使 newPromise 接受 x 的状态，也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
   - 如果 x 是 pending 状态，那么 promise 必须在 pending，直到 x 变为 fulfilled / rejected
   - 如果 x 是 fulfilled 状态，fulfill promise with the same value
   - 如果 x 是 rejected 状态，reject promise with the same reason

   8.3 如果 x 是一个 Object / Funtion (let then = x.then)
   
   ```js
   let then = x.then
   ```
   - 如果 x.then 出错：reject promise with e as reason
   - 
   
