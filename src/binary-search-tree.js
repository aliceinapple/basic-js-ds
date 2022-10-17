const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addFunction(this._root, data);
    
    function addFunction(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addFunction(node.left, data);
      } else {
        node.right = addFunction(node.right, data);
      }

      return node;
    }

    this._root = addFunction(this._root, data);
  }

  has(data) {
    function hasFunction(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data
        ? hasFunction(node.left, data)
        : hasFunction(node.right, data);
    }

    return hasFunction(this._root, data);
  }

  find(data) {
    function findFunction(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data
        ? findFunction(node.left, data)
        : findFunction(node.right, data);
    }

    return findFunction(this._root, data);
  }

  remove(data) {
    function removeFunction(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeFunction(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeFunction(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxFromLeft = node.left;

        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;

        node.left = removeFunction(node.left, maxFromLeft.data);

        return node;
      }
    }

    this._root = removeFunction(this._root, data);
  }

  min() {
    if (!this._root) {
      return null;
    }

    let min = this._root;
    while (min.left) {
      min = min.left;
    }

    return min.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let max = this._root;
    while (max.right) {
      max = max.right;
    }

    return max.data;
  }
}

module.exports = {
  BinarySearchTree,
};
