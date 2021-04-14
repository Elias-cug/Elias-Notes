function bubbleSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let flag = false
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = true
        const tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
    if (!flag) {
      break
    }
  }
  return arr
}

console.log(bubbleSort([1, 1, 4, 3, 6, 10, 3, 2, 11, 12, 13, 14]))
