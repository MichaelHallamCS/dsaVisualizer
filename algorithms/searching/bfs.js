class Node {
    constructor(data, index){
        this.data = data;
        this.index = index;
        this.left = null;
        this.right = null;
    }
}

function buildTree(arr, i = 0){
    if (i >= arr.length) return null;

    const node = new Node(arr[i], i);
    node.left = buildTree(arr, 2 * i + 1);
    node.right = buildTree(arr, 2 * i + 2);
    return node;
}

function colorNode(index, color) {
    document.querySelector(`.tree-node[data-index="${index}"]`).style.backgroundColor = color;
    document.querySelector(`.heap-cell[data-index="${index}"]`).style.backgroundColor = color;
}



async function step(ctx, line) {
    ctx.highlight(line);
    await ctx.delay(ctx.getSpeed());
    return ctx.getIsSorting();
}

const QUEUED = 'var(--warning)';
const CHECKING = 'var(--danger)';
const CHECKED = 'var(--success)';

export async function breadthFirstSearch (bars, delay, getIsSorting, getSpeed, highlight, arr, root = buildTree(arr)){
    const ctx = {bars, delay, getIsSorting, getSpeed, highlight, arr};
    if (!await step(ctx, 7)) return;

    if (!root) return [];
    if (!await step(ctx, 8)) return;

    const queue = [root];
    if (!await step(ctx, 9)) return;
    const order = [];
    if (!await step(ctx, 10)) return;

    if (!await step(ctx, 11)) return;

    colorNode(root.index, QUEUED);
    while (queue.length > 0) {
        if (!await step(ctx, 12)) return;
        const node = queue.shift();
        colorNode(node.index, CHECKING);
        if (!await step(ctx, 13)) return;
        order.push(node.data);
        if (!await step(ctx, 14)) return;
        if (node.left){
            queue.push(node.left);
            colorNode(node.left.index, QUEUED);
        } 
        if (!await step(ctx, 15)) return;
        if (node.right){
            queue.push(node.right);
            colorNode(node.right.index, QUEUED);
        }
        colorNode(node.index, CHECKED);
    }
    if (!await step(ctx, 17)) return;
    if (!await step(ctx, -1)) return;
    return order;

}

export const bfsInfo = {
    title: "Breadth First Search",
    description: "Breadth First Search is a graph traversal algorithm that explores a graph level by level, starting from a source node and visiting all nodes at the current level before moving on to nodes on step below.'",
    bigO: "Worst: O(V+E) | Best: O(1)",
    codeArr: [
        "class Node {",
        "  constructor(data) {",
        "      this.data = data;",
        "      this.left = null;",
        "      this.right = null;",
        "  }",
        "}",
        "function bfsTree(root) {",
        "  if (!root) return [];",
        "  const queue = [root];",
        "  const order = [];",
        "  while (queue.length > 0) {",
        "      const node = queue.shift();",
        "      order.push(node.data);",
        "      if (node.left) queue.push(node.left);",
        "      if (node.right) queue.push(node.right);",
        "  }",
        "  return order;",
        "}"
    ]
}