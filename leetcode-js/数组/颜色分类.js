// 三路快速排序
function sortColors (nums) {
  let n = nums.length
  let lt = -1
  let gt = n
  let i = 0

  while (i < gt) {
    if (nums[i] === 0) {
      lt++
      ;[nums[lt], nums[i]] = [nums[i], nums[lt]]
      i++
    } else if (nums[i] === 2) {
      gt--
      ;[nums[gt], nums[i]] = [nums[i], nums[gt]]
    } else {
      i++
    }
  }

  return nums
}

console.log(sortColors([0, 1, 2, 0, 2, 1, 1, 2, 0]))
