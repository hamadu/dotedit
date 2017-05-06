export default class Tool {
  contsructor(name, options = {}) {
    this.name = name;
    this.options = options;
  }

  down() {
    throw 'NotImplementedException(Tool#down)';
  }

  move() {
    throw 'NotImplementedException(Tool#move)';
  }

  up() {
    throw 'NotImplementedException(Tool#up)';
  }
}
