class Queue {
  constructor(items = []) {
    this.items = items;
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      Logger.log("Queue is empty")
      return;
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
