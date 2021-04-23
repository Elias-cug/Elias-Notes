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
