# BFS & DFS

## BFS 广度优先搜索

```js
function BFS (node) {
  const nodes = []
  const unhandle = [node]

  while (unhandle.length) {
    const curNode = unhandle.shift()
    const children = curNode && curNode.children

    curNode && nodes.push(curNode)
    children && children.map(c => {
      unhandle.push(c)
    })
  }

  return nodes
}

BFS({ 0:0, children: [{1:1, children: [{4:4}]}, {2:2}, {3:3, children: [{5:5}]}] })
```

## DFS 深度优先搜索

```js
function DFS (node, nodes = []) {
  const children = node && node.children
  
  node && nodes.push(curNode)
  children && children.map(c => {
    DFS(c, nodes)
  })

  return nodes
}
```