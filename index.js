const obj = {
  a: 'aaaaaa',
  b: [1, 2, 3]
}
Object.freeze(obj)
Object.freeze(obj.b)

const cpObj = obj

obj.a = 'ddddd'
obj.b.push('aa')
