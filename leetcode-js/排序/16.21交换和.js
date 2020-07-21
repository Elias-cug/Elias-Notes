function findSwapValues(array1, array2) {
  // 求各数组的和
  let sum1 = 0;
  let sum2 = 0;
  let set = new Set()
  array1.forEach(element => {
    sum1 += element
  });

  array2.forEach(element => {
    sum2 += element
    set.add(element)
  });

  // 计算sum1 sum2之差
  let c = sum1 - sum2
  if (c % 2 !== 0) {
    return []
  }
  for (let i = 0; i < array1.length; i++) {
    if (set.has(array1[i] - c*0.5)){
      return [array1[i], (array1[i] - c*0.5)]
    }
  }
  return []
}

console.log(findSwapValues([4,1,2,1,1,2], [3,6,3,3]))