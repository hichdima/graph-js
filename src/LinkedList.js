class Node {
    constructor(data) {
        this.data = data;
        this.nextNode = null;
    }
}

// Linked List methods list:
// 1. isEmpty();
// 2. insertAtHead(data);
// 3. insertAtTail(data);
// 4. search(value);
// 5. deleteAtHead();
// 6. deleteAtTail();
// 7. deleteAtData(value);
// 8. length();
// 9. printSelf();
// 10. createReversed();
// 11. reverseSelf();
// 12. detectLoop();
// 13. findMid();
// 14. removeDublicates();
// 15. union(list1, list2);
// 16. intersection(list1, list2);
// 17. findNthFromTail(n);

module.exports = class LinkedList {
    constructor() {
        this.head = null;
    }

    isEmpty() {
        return (this.head == null);
    }

    insertAtHead(data) {
        let tempNode = new Node(data);
        tempNode.nextNode = this.head;
        this.head = tempNode;

        return this;
    }

    insertAtTail(data) {
        let node = new Node(data);

        node.nextNode = null;

        if (this.isEmpty()) {
            this.head = node;
            return this;
        }

        let traverser = this.head;

        while (traverser.nextNode != null) {
            traverser = traverser.nextNode;
        }

        traverser.nextNode = node;

        return this;
    }

    insertAtN(data, n) {
        let node = new Node(data);
        let traverser = this.head;

        while (traverser.data != n) {
            traverser = traverser.nextNode;
        }

        node.nextNode = traverser.nextNode;
        traverser.nextNode = node;

        return this;
    }

    search(value) {
        if (!this.isEmpty()) {

            let currentNode = this.head;

            while (currentNode.nextNode != null) {
                if (currentNode.data == value) return true;
                currentNode = currentNode.nextNode;
            }

            return (currentNode.nextNode == null) ? false : true;
        }
    }

    deleteAtHead() {
        if (this.isEmpty()) {
            return this;
        }

        this.head = this.head.nextNode;

        return this;
    }

    deleteAtTail() {
        if (this.isEmpty()) {
            return false;
        }

        let currentNode = this.head;
        let prevNode;

        if (currentNode.nextNode == null) {
            this.deleteAtHead();
            return true;
        }

        while (currentNode.nextNode != null) {
            prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }

        prevNode.nextNode = null;

        return true;
    }

    deleteAtData(value) {
        if (this.isEmpty()) {
            return this;
        }

        let currentNode = this.head;
        let prevNode;

        if (currentNode.data == value) {
            this.head = currentNode.nextNode;
            return true;
        }

        while (currentNode.nextNode != null && currentNode.data != value) {
            prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }

        prevNode.nextNode = currentNode.nextNode;

        return true;
    }

    length() {
        if (list.isEmpty()) {
            return 0;
        }

        let currentNode = this.head;
        let length = 0;

        while (currentNode != null) {
            length++;
            currentNode = currentNode.nextNode;
        }

        return length;
    }

    printSelf() {
        let string = "";
        let temp = this.head;

        while (temp != null) {
            string += temp.data + " -> ";
            temp = temp.nextNode;
        }

        string += "Null";

        console.log(string);

        return string;
    }

    createReversed() {
        // returns a new reversed list

        let reversedList = new LinkedList;

        let traverser = this.head;

        while (traverser != null) {
            reversedList.insertAtHead(traverser.data);
            traverser = traverser.nextNode;
        }

        return reversedList;
    }

    reverseSelf() {
        // reverses current list

        let traverser = this.head;
        let prevNode = null;


        while (traverser != null) {
            let currNode = traverser;
            let nextNode = traverser.nextNode;

            traverser.nextNode = prevNode;
            prevNode = currNode;
            traverser = nextNode;
        }

        this.head = prevNode;
    }

    detectLoop() {
        // returns true if there is a loop in the linked list

        // two traversers, the second one jumps two nodes at a time, if traversers value is equal - there is a loop
        let traverser1 = this.head;
        let traverser2 = this.head;

        while (traverser2 != null) {
            if (traverser1.data == traverser2.data) return true;
            traverser1 = traverser1.nextNode;
            traverser2 = traverser2.nextNode.nextNode;
        }

        return false;
    }

    findMid() {
        // returns the middle node
        // if lengths of list is even returns length / 2
        // if lengths of list is odd returns length / 2 - 1

        let traverser1 = this.head;
        let traverser2 = this.head;

        while (traverser1 != null) {
            traverser1 = traverser1.nextNode;
            traverser2 = traverser2.nextNode.nextNode;

            if (traverser2.nextNode == null || traverser2.nextNode.nextNode == null) return traverser1;
        }

        return false;
    }

    removeDublicates() {
        let dublicatesRemoved = false;

        while (!dublicatesRemoved) {
            dublicatesRemoved = true;

            let used = [];
            let t = this.head;
            let prev = null;

            while (t != null) {

                if (used.includes(t.data)) {
                    prev.nextNode = t.nextNode;
                    dublicatesRemoved = false;
                    break;
                }

                used.push(t.data);
                prev = t;
                t = t.nextNode;
            }
        }
    }

    findNthFromTail(n) {
        let i = 0;
        let t1 = this.head;
        let t2 = this.head;

        while (i < n) {
            if (t2 == null) {
                return "Out of bound";
            }

            t2 = t2.nextNode;
            i++;
        }

        while (t2 != null) {
            t1 = t1.nextNode;
            t2 = t2.nextNode;
        }

        return t1.data;
    }
}

// helper methods
const union = (list1, list2) => {
    // takes two linked lists and returns their union

    let result = new LinkedList();

    let t1 = list1.head;

    while (t1 != null) {
        result.insertAtTail(t1.data);
        t1 = t1.nextNode;
    }

    let t2 = list2.head;

    while (t2 != null) {
        result.insertAtTail(t2.data);
        t2 = t2.nextNode;
    }

    result.removeDublicates();

    return result;
}

const intersection = (list1, list2) => {
    // returns all the elements that are common between two linked lists

    let result = new LinkedList();
    let t1 = list1.head;

    while (t1 != null) {
        let t2 = list2.head;

        while (t2 != null) {
            if (t1.data == t2.data) {
                result.insertAtTail(t2.data);
            }

            t2 = t2.nextNode;
        }

        t1 = t1.nextNode;
    }

    result.removeDublicates();

    return result;
}
