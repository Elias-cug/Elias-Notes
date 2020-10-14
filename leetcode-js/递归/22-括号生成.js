
function generateParenthesis(n) {
  function generate(left, right, n, s) {
    // recursion termination
    if (left === n && right === n) {
      result.push(s)
    }
    // process
  
    // level + 1
    if (left < n) {
      generate(left + 1, right, n, s + '(')
    }
  
    if (right < left) {
      generate(left, right + 1, n, s + ')')
    }
    // 
  }
  const result = []
  generate(0, 0, n, '')
  return result
}

console.log(generateParenthesis(3));