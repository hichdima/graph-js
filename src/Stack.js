module.exports = class Stack {
    constructor() {
        this.items = [];
        this.top = null;
    }

    getTop() {
        return this.top;
    }

    isEmpty() {
        return this.top == null;
    }

    size() {
        return this.items.length;
    }

    push(element) {
        this.items.push(element);
        this.top = element;
    }

    pop() {
        if (this.items.lengths == 0) {
            return null;
        } else if (this.items.lengths == 1) {
            this.top = null;
            return this.items.pop();
        } else {
            this.top = this.items[this.items.length - 2];
            return this.items.pop();
        }
    }
}