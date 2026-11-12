export async function breadthFirstSearch (bars, delay, getIsSorting, getSpeed, highlight, arr){
    
}

export const bfsInfo = {
    title: "Breadth First Search",
    description: "Breadth first search is a graph traversal algorithm that explores a graph level by level, starting from a source node and visiting all nodes at the current level before moving on to nodes on step below.'",
    bigO: "Worst: O(V+E) | Best: O(1)",
    codeArr: [
        "function bfs(graph, start) {",
        "  const visited = new Set([start]);",
        "  const queue = [start];",
        "  const order = [];",
        "  while (queue.length > 0) {",
        "      const node = queue.shift();",
        "      order.push(node);",
        "      for (const neighbor of graph[node]) {",
        "          if (!visited.has(neighbor)) {",
        "              visited.add(neighbor);",
        "              queue.push(neighbor);",
        "          }",
        "      }",
        "  }",
        "  return order;",
        "}"
    ]
}