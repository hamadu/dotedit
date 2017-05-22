export default class DotHistory {
  constructor(dots) {
    this.histories = [dots.slice(0)];
    this.pos = 0;
  }

  push(dots) {
    while (this.histories.length > this.pos + 1) {
      this.histories.pop();
    }
    this.histories.push(dots);
    this.pos += 1;
  }

  prev() {
    if (this.pos >= 1) {
      this.pos--;
      return this.histories[this.pos];
    }
    return this.histories[0];
  }

  next() {
    if (this.pos + 1 < this.histories.length) {
      this.pos += 1;
      return this.histories[this.pos];
    }
    return this.histories[this.histories.length-1];
  }
}
