/**
 * 快速排序
 */
function quickSort(arr){
  if(arr.length<1){
      return arr;
  }
  var pivotIndex=Math.floor(arr.length/2);//找到那个基准数
  var pivot=arr.splice(pivotIndex,1)[0]; //取出基准数，并去除，splice返回值为数组。
  var left=[]; 
  var right=[];
  for(var i=0;i<arr.length;i++){
      if(arr[i]<pivot){
          left.push(arr[i]);
      }else{
          right.push(arr[i]);
      }
  }
  let result = quickSort(left).concat([pivot],quickSort(right));
  return result
}
