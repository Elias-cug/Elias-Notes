// 1.双指针 --> 快指针r、慢指针l
var moveZeroes1 = function (nums, l = 0, r = -1) {
  while (r++ < nums.length) {
    if (nums[r]) {
      nums[l] === 0 && ([nums[l], nums[r]] = [nums[r], nums[l]]), l++
    }
  }
  return nums
}

console.log(moveZeroes1([1, 0, 1, 5, 6, 7, 0, 1, 0, 6]))

// 2. 双指针 + 高阶函数（reduce）
var moveZeroes2 = function (nums) {
  nums.reduce(
    (p, v, i, a) =>
      v !== 0 ? (a[p] === 0 && ([a[i], a[p]] = [a[p], a[i]]), p + 1) : p,
    0
  )
  return nums
}
console.log(moveZeroes2([1, 0, 1, 5, 6, 7, 0, 1, 0, 6]))
