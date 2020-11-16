module.exports = class Queue {
    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    getFront() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[0];
    }

    size() {
        return this.items.length;
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items.shift();
    }

    printSelf() {
        if (this.isEmpty()) {
            return null;
        }

        let string = "";

        for (let i = 0; i < this.items.length; i++) {
            string += this.items[i];
            if (i < this.items.length - 1) string += " => ";
        }

        return string;
    }
}

