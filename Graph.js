// Implementation of a Graph using Adjustency List via JavaScript

// Graph methods list:
// 1. addEdge(source, destination);
// 2. printSelf(data);
// 3. TODO: breadthFirstTraversal();
// 3. TODO: depthFirstTraversal();

const LinkedList = require('./src/LinkedList.js');
const Queue = require('./src/Queue.js');

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

            while (currListNode !== null) {
                s += currListNode.data + " => ";
                currListNode = currListNode.nextNode;
            }

            s += "Null";

            console.log(s);
        }
    }   


    breadthFirstTraversal(source) {
        console.log("Visited: " + source +"; ");

        let q = new Queue;

        for (let i = source; i < this.vertices; i++) {
            
            // we reverse the list of each vertex to traverse the graph from left to right
            let reversedList = this.list[i].createReversed();
            let t = reversedList.head;
            

            while (t !== null) {
                q.enqueue(t.data);
                t = t.nextNode;
            }
        }
        
        while (q.getFront()) {
            console.log("Visited: " + q.dequeue() +"; ");
        }
    }

    // TODO: Depth-first traversal
}

let myGraph = new Graph(6);

myGraph.addEdge(0,1);
myGraph.addEdge(0,2);
myGraph.addEdge(2,3);
myGraph.addEdge(2,4);
myGraph.addEdge(2,5);
myGraph.addEdge(5,0);

myGraph.printSelf();
console.log();
myGraph.breadthFirstTraversal(0);