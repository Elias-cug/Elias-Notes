var climbStairs = function(n) {
  let count = 0

  if (n <= 1) {
    return 1
  }else {
    count = climbStairs(n-2) + climbStairs(n-1)
  }
  return count
}

console.log(climbStairs(3));