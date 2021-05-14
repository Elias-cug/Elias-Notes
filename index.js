function baz () {
  console.log('baz')
  console.log(this)
  bar()
}

function bar () {
  console.log('bar')
  console.log(this)
  foo()
}

function foo () {
  console.log('foo')
  console.log(this)
}

baz()
