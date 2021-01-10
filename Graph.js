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

    breadthFirstTraversal(source) {
        console.log("Visited: " + source +"; ");

        let q = new Queue;
        
        let visited = [];
        for (let i = source; i < this.vertices; i++) {
            visited.push(false);
        }

        for (let i = source; i < this.vertices; i++) {
            // we reverse the list of each vertex to traverse the graph from left to right
            let reversedList = this.list[i].createReversed();
            let t = reversedList.head;
            
            while (t !== null) {
                // enque vertex if we didn't visit it yet
                if (!visited[t.data]) {
                    q.enqueue(t.data);
                    visited[t.data] = true;
                }
                t = t.nextNode;
            }
        }
        
        while (q.getFront()) {
            console.log("Visited: " + q.dequeue() +"; ");
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
            
            // visit every vertex we have in the stack
            while(s.getTop()) {
                let currentNode = s.pop();                                
                if (!visited[currentNode]) traverse(currentNode);
            }
            
            // unconnected graph check
            // visit vertex if we didn't yet 
            for (let i = 0; i < visited.length; i++) {
                if (!visited[i]) traverse(i);
            }
        }
    }
}

// Test input Graph A
// |0| => null
// |1| => [2] -> [0] -> null
// |2| => null
// |3| => null
// |4| => [3] -> null
let myGraph = new Graph(5);
myGraph.addEdge(1,2);
myGraph.addEdge(1,0);
myGraph.addEdge(4,3);

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

myGraph.printSelf();
console.log();
myGraph.depthFirstTraversal(0);