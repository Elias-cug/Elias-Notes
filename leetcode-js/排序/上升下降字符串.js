function sortString(s) {
  if (s === '') {
    return ''
  }
  let arr = s.split('')
  let newArr = []
  let newArr2 = []
  let leftArr = []
  let leftArr2 = []
  let result = ''
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    } else {
      leftArr.push(arr[i])
    }
  }

  result = newArr.sort().join('')
  for (let i = 0; i < leftArr.length; i++) {
    if (newArr2.indexOf(leftArr[i]) === -1) {
      newArr2.push(leftArr[i])
    } else {
      leftArr2.push(leftArr[i])
    }
  }
  result += newArr2.sort((a,b) => {
    if (a > b) {
      return -1
    } else if (a < b) {
      return 1
    } else {
      return 0
    }
  }).join('')
  return result + sortString(leftArr2.join(''))
}

console.log(sortString('abcag'))