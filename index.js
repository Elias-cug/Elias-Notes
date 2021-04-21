// const { swap } = require('../utils/index.js')

function quickSort (arr) {
  return quick(arr, 0, arr.length - 1)
}

function quick (arr, left, right) {
  let index
  if (arr.length > 1) {
    index = partition(arr, left, right)

    if (index - 1 > left) {
      quick(arr, left, index - 1)
    }

    if (index < right) {
      quick(arr, index, right)
    }
  }

  return arr
}

function partition (arr, left, right) {
  const pivot = arr[Math.floor((right + left) / 2)]
  let i = left
  let j = right
  while (i <= j) {
    while (arr[i] < pivot) {
      i++
    }

    while (arr[j] > pivot) {
      j--
    }

    if (i <= j) {
      swap(arr, i, j)
      i++
      j--
    }
  }
  return i
}

const swap = function (array, a, b) {
  const temp = array[a]
  array[a] = array[b]
  array[b] = temp
  // [array[a], array[b]] = [array[b], array[a]]
}

console.log(quickSort([7, 8, 4, 3, 2]))
