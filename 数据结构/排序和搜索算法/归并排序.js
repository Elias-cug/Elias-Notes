function mergeSort (arr) {
  if (arr.length > 1) {
    const len = arr.length
    const mid = Math.floor(len / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid, len))
    return merge(left, right)
  }
  return arr
}

function merge (left, right) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }
  return result.concat(
    i < left.length ? left.slice(i, left.legth) : right.slice(j, right.legth)
  )
}

console.log(mergeSort([1, 4, 3, 6, 7, 3, 5, 6, 8, 11, 8, 4]))
