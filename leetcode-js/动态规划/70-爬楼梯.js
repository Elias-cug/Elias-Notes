
// 动态规划
var climbStairs1 = function(n) {
  if (n <= 2) {
    return n
  }

  let i1 = 1
  let i2 = 2

  for (let i = 3; i <= n; i++) {
    let tmp = i1 + i2
    i1 = i2
    i2 = tmp
  }

  return i2
}

console.log(climbStairs(4));




