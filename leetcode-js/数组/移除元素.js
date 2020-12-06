/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement1 = function (nums, val) {
  let ans = nums.length
  for (let i = 0; i < ans; ) {
    if (nums[i] == val) {
      nums[i] = nums[ans - 1]
      ans--
    } else {
      i++
    }
  }
  return ans
}

var removeElement2 = function (nums, val) {
  let l = 0
  let r = 0
  while (r < nums.length) {
    if (nums[r] !== val) {
      nums[l] = nums[r]
      l++
    }
    r++
  }
  return l
}
