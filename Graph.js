// Implementation of a Graph using Adjustency List via JavaScript

// Graph methods list:
// 1. addEdge(source, destination);
// 2. printSelf(data);
// 3. breadthFirstTraversal(source);
// 3. depthFirstTraversal(source);

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
    
    // TODO: fix incorrect order of vivited vertexes
    breadthFirstTraversalAlt(source) {
        let q = new Queue;
        let g = this;
        let visited = [];
        
        // keep track of every visited vertex with this array
        for (let i = source; i < this.vertices; i++) visited.push(false);

        // enque edges of each vertex into the queue
        for (let i = source; i < this.vertices; i++) {
            let list = g.list[i].createReversed();
            let t = list.head;
            
            while (t !== null) {
                if (!visited[t.data]) {
                    q.enqueue(t.data);
                }
                t = t.nextNode;
            }            
        }
        
        // visit every vertex we have in the queue
        visitVertexes(q);
        
        function visitVertexes(q) {
            console.log(q);
            while (!q.isEmpty()) {
                let currentNode = q.dequeue();
                if (!visited[currentNode]) {
                    console.log("Visited: " + currentNode);
                    visited[currentNode] = true; 
                }
            }  
        }

        let disconnected = false;
        // disconnected graph check
        // visit vertex if we didn't yet 
        for (let i = 0; i < visited.length; i++) {
            if (!visited[i]) {
                console.log(i);
                q.enqueue(i);
                disconnected = true;
            }
        }
        
        if (disconnected) {
            visitVertexes(q);
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
            
            // disconnected graph check
            // visit vertex if we didn't yet 
            for (let i = 0; i < visited.length; i++) {
                if (!visited[i]) traverse(i);
            }
        }
    }
        
    // Returns ture if there is a cycle in the graph
    detectCycle() {
        console.log("We begin");

        var g = this;        
        var visited = [];
        
        for (let i = 0; i < g.vertices; i++) {
            visited[i] = false;
        }

        for (let i = 0; i < visited.length; i++) {
            if (traverse(i)) {
                console.log("Part of the cycle 2: " + i);
                return true;
            }
        }

        function traverse(i) {
            var s = new Stack;

            console.log("Visited " + i);
            visited[i] = true;
            s.push(i);

            while (s.isEmpty() == false) {
                let current_node = s.pop();

                var temp = g.list[current_node].head;

                while(temp != null) {
                    if (visited[temp.data]) {
                        console.log("Part of the cycle 1: " + current_node);
                        return true;
                    }
                    s.push(temp.data);
                    temp = temp.nextElement;
                }
            }

            return false;
        }

        console.log("No cycles detected.");
        return false; 
    }
}

// Inputs for testing.

// Test input Graph A (disconnected)
// |0| => null
// |1| => [2] -> [0] -> null
// |2| => null
// |3| => null
// |4| => [3] -> null
let myGraph = new Graph(3);
myGraph.addEdge(0,1);
myGraph.addEdge(1,2);
myGraph.addEdge(2,0);

myGraph.printSelf();
myGraph.detectCycle();