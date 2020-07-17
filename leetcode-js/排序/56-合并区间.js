/**
 * 题目：给出一个区间的集合，请合并所有重叠的区间
 * 思路：排序再合并
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j ++) {
      if (arr[j][1] > arr[j + 1][1]) {
        flag = true;
        let tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp 
      }
    }
    if (!flag) {
      break;
    }
  }
  return arr
}

function quickSort(arr, left, right) {
  left = (typeof left) === 'number' ? left : 0
  right = (typeof right) === 'number' ? right : (arr.length - 1)
  if (left < right) {
    let mid = getMid(arr, left, right)

    quickSort(arr, left, mid-1)
    quickSort(arr, mid+1, right)
  }
  return arr
}

function getMid(arr, left, right) {
  let pivot = arr[left]
  while(left < right){
    while(arr[right][1] >= pivot[1] && left < right) {
      right--
    }
    arr[left] = arr[right]
    while(arr[left][1] <= pivot[1] && left < right) {
      left++
    }
    arr[right] = arr[left]
  }
  arr[left] = pivot
  return left
}


// 第一步排序

function merge(intervals) {
    let sortResult = quickSort(intervals)
  for (let i = sortResult.length - 1; i > 0; i--) {
    if (sortResult[i][0] <= sortResult[i - 1][1]) {
      let start = sortResult[i][0] < sortResult[i - 1][0] ? sortResult[i][0] : sortResult[i - 1][0]
      let end = sortResult[i][1] < sortResult[i - 1][1] ? sortResult[i - 1][1] : sortResult[i][1]
      sortResult[i - 1 ] = [start, end]
      sortResult.splice(i, 1)
    }
  }
  return sortResult
}

console.log(merge([[1,4],[0,1]]))