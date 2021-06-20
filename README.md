# graph-js
### Graph data structure implemented in javascript via adjacency list.

Methods included:

1. addEdge(source, destination);
Inserts a destination vertex into the list of source vertex.

1. printSelf();
Prints every vertex and its edges.

1. breadthFirstTraversal(source);
Breadth first traversal.

1. breadthFirstTraversalAlt(source);
Alternative breadth first traversal.

1. depthFirstTraversal(source);
Depth first traversal.

1. detectCycle();
Returns TRUE if there is a cycle in the graph.


### Example of how to create a graph:

```javascript
let myGraph = new Graph(7);

myGraph.addEdge(0,1);
myGraph.addEdge(0,2);

myGraph.printSelf();
```