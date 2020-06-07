// Implementation of a Graph using Adjustency List via JavaScript

// Graph methods list:
// 1. addEdge(source, destination);
// 2. printSelf(data);
// 3. TODO: breadthFirstTraversal();
// 3. TODO: depthFirstTraversal();

const LinkedList = require('./src/LinkedList.js');

class Graph {

    // Constructor expects Int to build N vertices (nodes)
    constructor(vertices) {
        // Total number of vertices in the graph
        this.vertices = vertices;

        // Array that will have a linked list for each vertex
        this.list = [];

        // Creating a new LinkedList for each vertex in the graph
        // LinkedList for this vertex will store all  edges (connections between vertices)
        for (let i = 0; i < vertices; i++) {
            let tmp = new LinkedList;
            this.list.push(tmp);
        }
    }

    addEdge(source, destination) {
        if (source <= this.vertices && destination <= this.vertices) {
            // Since we are implementing a directed graph, (0,1) is not the same as (1,0)
            this.list[source].insertAtHead(destination);

            // If we were implementing an undirected graph where (0,1) == (1,0)
            // We would create additional edge for destination
            // this.list[desctination].insertAtHead(source)
        }
    }

    printSelf() {
        console.log(">>> Adjustancy list for a Directed Graph <<<\n");
        for (let i = 0; i < this.vertices; i++) {
            let currListNode = this.list[i].head;
            let s = "Vertix " + i + ": ";

            while (currListNode != null) {
                s += currListNode.data + " => ";
                currListNode = currListNode.nextNode;
            }

            s += "Null";

            console.log(s);
        }
    }

    // TODO: Breadth-First Traversal

    // TODO: Depth-first traversal
}

let myGraph = new Graph(7);

myGraph.addEdge(0,1);
myGraph.addEdge(0,2);
myGraph.printSelf();