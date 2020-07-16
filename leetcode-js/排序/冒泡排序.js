/**
 * 冒泡排序算法
 * 分析：
 */

 function BubbleSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    let flag = false;
    for(let j = 0; j < arr.length - i - 1; j++) {
      let tmp = arr[j]
      if (arr[j] > arr[j + 1] ) {
        flag = true
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

 console.log(BubbleSort([1,4,3,4,6,2,7,2,1]))