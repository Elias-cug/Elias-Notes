const utils = require('../utils/index')
const { defaultCompare, Compare } = {...utils}
class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }

  // 向二叉树中插入一个键
  insert(key) {
    if(this.root === null || this.root === undefined) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node === null || node === undefined) {
      return
    }
    this.inOrderTraverseNode(node.left, callback)
    callback(node.key)
    this.inOrderTraverseNode(node.right, callback)
  }

  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if(node === null || node === undefined ) {
      return
    }
    callback(node.key)
    this.preOrderTraverseNode(node.left, callback)
    this.preOrderTraverseNode(node.right, callback)
  }

  // 后续遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    if(node === null || node === undefined) {
      return
    }
    this.postOrderTraverseNode(node.left, callback)
    this.postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }

  // 搜索树中的最小值
  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    let current = node
    while(current !== null && current.left !== null && current.left !== undefined) {
      current = current.left
    }
    return current
  }

  // 搜索树中的最大值
  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    let current = node
    while (current !== null && current.right !== null && current.right !== undefined) {
      current = current.right
    }
    return current
  }

  // 搜索一个特定值
  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (node === null || node === undefined) {
      return false
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 移除一个节点
  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    
  }
}

const tree = new BinarySearchTree()
tree.insert(2)
tree.insert(5)
tree.insert(1)
tree.insert(0)
tree.insert(9)
tree.insert(11)
tree.insert(8)
tree.insert(4)
tree.insert(10)
console.log(tree.search(80));
