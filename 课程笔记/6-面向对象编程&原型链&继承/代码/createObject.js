// 工厂模式

function createPerson1 (name, sex) {
  const People = new Object()

  People.name = name
  People.sex = sex
  People.sayName = function () {
    console.log(`我是工厂模式，我的名字是：${this.name}`)
  }

  return People
}

const preson1 = createPerson1('工厂模式', '男')
preson1.sayName()

// 构造函数

function Person2 (name, sex) {
  this.name = name
  this.sex = sex
  this.sayName = function () {
    console.log(`我是构造函数，我的名字是：${this.name}`)
  }
}

const person2 = new Person2('构造函数', '女')
person2.sayName()

// 原型模式

function Person3 () {}

Person3.prototype.name = '原型模式'
Person3.prototype.sex = '男'
Person3.prototype.sayName = function () {
  console.log(`我是原型模式，我的名字是：${this.name}`)
}

const person3 = new Person3()
person3.sayName()

// 构造函数 + 原型

function Person4 (name, sex) {
  this.name = name
  this.sex = sex
}

Person4.prototype.sayName = function () {
  console.log(`我是构造原型混合版，我的名字是：${this.name}`)
}

const person4 = new Person4('构造原型混合版', '女')
person4.sayName()

// 动态原型模式
function Person5 (name, sex) {
  this.name = name
  this.sex = sex

  if (typeof this.sayName !== 'function') {
    Person5.prototype.sayName = function () {
      console.log(`我是动态原型模式，我的名字是：${this.name}`)
    }
  }
}
const person5 = new Person5('动态原型模式', '女')
person5.sayName()

// 寄生构造函数模式
function Person6 (name, sex) {
  const o = new Object()
  o.name = name
  o.sex = sex
  o.sayName = function () {
    console.log(`我是寄生构造函数模式，我的名字是：${this.name}`)
  }

  return o
}

const person6 = new Person6('构造原型混合版', '女')
person6.sayName()

// 稳妥构造函数模式
function Person7 (name, sex) {
  const o = new Object()

  // 可以在这里定义私有变量和函数

  // 定义方法
  o.sayName = function () {
    console.log(`我是稳妥构造函数模式，我的名字是：${name}`)
  }

  return o
}

const person7 = new Person7('稳妥构造函数模式', '女')
person7.sayName()
