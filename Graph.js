// Implementation of a Graph using Adjustency List via JavaScript

// Graph methods list:
// 1. addEdge(source, destination);
// 2. printSelf(data);
// 3. TODO: breadthFirstTraversal();
// 3. TODO: depthFirstTraversal();

const LinkedList = require('./src/LinkedList.js');
const Queue = require('./src/Queue.js');
const Stack = require('./src/Stack.js');

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

    // TODO: disconnected graph traversing
    breadthFirstTraversal(source) {
        let q = new Queue;
        let g = this;
        let visited = [];
        
        for (let i = source; i < this.vertices; i++) visited.push(false);

        traverse(source);
        
        function traverse(source) {
            console.log("Visited: " + source);
            visited[source] = true; 
            
            let list = g.list[source].createReversed();
            let t = list.head;
            
            // enque edges of current vertex to the queue
            while (t !== null) {
                if (!visited[t.data]) {
                    q.enqueue(t.data);
                }
                t = t.nextNode;
            }
                    
            console.log(q);
            
            // visit every vertex we have in the queue
            while (q.getFront()) {
                let currentNode = q.dequeue();
                if (!visited[currentNode]) traverse(currentNode);
            }
            
            // disconnected graph check
            // visit vertex if we didn't yet 
            for (let i = 0; i < visited.length; i++) {
                if (!visited[i]) traverse(i);
            }
        }
    }
    
    depthFirstTraversal(source) {
        let s = new Stack;
        let g = this;
        let visited = [];
        
        for (let i = source; i < this.vertices; i++) visited.push(false);
        visited[0] = true;
        
        traverse(source);
        
        function traverse(source) {
            console.log("Visited: " + source);
            visited[source] = true; 
            
            let list = g.list[source];
            let t = list.head;
            
            // push all edges of current vertex to the stack
            while (t != null) {
                if (!visited[t.data]) s.push(t.data);
                t = t.nextNode;
            }
            
            console.log(s);
            
            // visit every vertex we have in the stack
            while(s.getTop()) {
                let currentNode = s.pop();
                if (!visited[currentNode]) traverse(currentNode);
            }
            
            // disconnected graph check
            // visit vertex if we didn't yet 
            for (let i = 0; i < visited.length; i++) {
                if (!visited[i]) traverse(i);
            }
        }
    }
}

// Inputs for testing.

// Test input Graph A (disconnected)
// |0| => null
// |1| => [2] -> [0] -> null
// |2| => null
// |3| => null
// |4| => [3] -> null
// let myGraph = new Graph(5);
// myGraph.addEdge(1,2);
// myGraph.addEdge(1,0);
// myGraph.addEdge(4,3);

// Test input Graph B
// |0| => [2] -> [1] -> null
// |1| => [3] -> null
// |2| => [3] -> null
// |3| => null
// let myGraph = new Graph(4);
// myGraph.addEdge(0,2);
// myGraph.addEdge(0,1);
// myGraph.addEdge(1,3);
// myGraph.addEdge(2,3);

// Test input Graph C
// |0| => [1] -> [2] -> [3] -> null
// |1| => [4] -> [5] -> [6] -> null
// |2| => [7] -> [8] -> [9] -> null
// |3| => [10] -> [11] -> [12] -> null
// |3| => [10] -> [11] -> [12] -> null
// |4| => [13] -> [14] -> [15] -> null
let myGraph = new Graph(16);
myGraph.addEdge(0,1);
myGraph.addEdge(0,2);
myGraph.addEdge(0,3);
myGraph.addEdge(1,4);
myGraph.addEdge(1,5);
myGraph.addEdge(1,6);
myGraph.addEdge(2,7);
myGraph.addEdge(2,8);
myGraph.addEdge(2,9);
myGraph.addEdge(3,10);
myGraph.addEdge(3,11);
myGraph.addEdge(3,12);
myGraph.addEdge(4,13);
myGraph.addEdge(4,14);
myGraph.addEdge(4,15);

myGraph.printSelf();
console.log();
myGraph.breadthFirstTraversal(0);