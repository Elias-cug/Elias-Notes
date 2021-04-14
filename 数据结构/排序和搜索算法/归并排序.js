function mergeSort (arr) {
  if (arr.length > 1) {
    const len = arr.length
    const middle = Math.floor(len / 2)
    const left = mergeSort(arr.slice(0, middle))
    const right = mergeSort(arr.slice(middle, len))
    arr = merge(left, right)
  }
  return arr
}

function merge (left, right) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

console.log(mergeSort([3, 5, 9, 8, 2, 4, 7]))
