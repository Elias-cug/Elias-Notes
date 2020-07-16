
function quickSort(arr, left, right) {
  left = (typeof left) === 'number' ? left : 0
  right = (typeof right) === 'number' ? right : (arr.length - 1)
  if (left < right) {
    let mid = getMid(arr, left, right)

    quickSort(arr, left, mid-1)
    quickSort(arr, mid+1, right)
  }
  console.log(arr)
}

function getMid(arr, left, right) {
  let pivot = arr[left]
  while(left < right){
    while(arr[right] >= pivot && left < right) {
      right--
    }
    arr[left] = arr[right]
    while(arr[left] <= pivot && left < right) {
      left++
    }
    arr[right] = arr[left]
  }
  arr[left] = pivot
  return left
}

quickSort([5,4,7,2,9,5,1,77,33,12])