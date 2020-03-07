class binPacker {
  constructor(width, height) {
    this.root = { x: 0, y: 0, width: width, height: height };
  }

  findSpace(notices) {
    for (let index = 0; index < notices.length; index++) {
      const notice = notices[index];
      if (
        (currentNode = this.checkNodeUse(
          this.root,
          notice.width,
          notice.height
        ))
      ) {
          
      }
    }
  }
}

Packer.prototype = {
  init: function(w, h) {
    this.root = { x: 0, y: 0, w: w, h: h };
  },

  fit: function(blocks) {
    var n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      if ((currentNode = this.checkNodeUse(this.root, block.w, block.h)))
        block.fit = this.splitNode(currentNode, block.w, block.h);
    }
  },

  findNode: function(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if (w <= root.w && h <= root.h) return root;
    else return null;
  },

  splitNode: function(node, w, h) {
    node.used = true;
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
    return node;
  }
};
