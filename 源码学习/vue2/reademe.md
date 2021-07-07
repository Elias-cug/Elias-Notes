## vue源码

### vue实例

### 核心公共函数
1. env.js

- 判断环境、判断什么浏览器
- 获取用户代理信息
- 是否有 __proto__ 属性
- 是否支持 passive
- 是否服务端渲染
- 是否为原生方法
- 是否有 Symbol 方法
- 实现兼容 Set 方法
### 知识点
1. passive
- passive是什么？
Chrome提出的一个新的浏览器特性：Web开发者通过一个新的属性passive来告诉浏览器，当前页面内注册的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能。当属性passive的值为true的时候，代表该监听器内部不会调用preventDefault函数来阻止默认滑动行为，Chrome浏览器称这类型的监听器为被动（passive）监听器。目前Chrome主要利用该特性来优化页面的滑动性能，所以Passive Event Listen
- 应用场景是什么？
Passive Event Listeners特性是为了提高页面的滑动流畅度而设计的，页面滑动流畅度的提升，直接影响到用户对这个页面最直观的感受。这个不难理解，想象一下你想要滑动某个页面浏览内容，当你用鼠标滚轮或者用手指触摸屏幕上下滑动的时候，页面并没有按你的预期进行滚动，此时你内心往往会感觉到一丝不爽，甚至想放弃该页面。Facebook之前做了一项试验，他们将页面滑动的响应刷新率从60FPS降低到30FPS的时候，发现用户的参与度急速下降
- 怎么使用呢？
```js
function handler() {
  console.log('passive')
}
window.addEventListener('mousewheel', handler, {passive: true})
```
