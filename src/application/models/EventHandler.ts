const LEFT = 'ArrowLeft'
const UP = 'ArrowUp'
const RIGHT = 'ArrowRight'
const DOWN = 'ArrowDown'


export class EventHandler {

  mvLeft: boolean
  mvUp: boolean
  mvRight: boolean
  mvDown: boolean

  constructor() {
    window.addEventListener("keydown", this.keydownHandler.bind(this), false);
    window.addEventListener("keyup", this.keyupHandler.bind(this), false);

    this.mvLeft = false
    this.mvUp = false
    this.mvRight = false
    this.mvDown = false
  }

  keydownHandler(e: KeyboardEvent) {
    switch (e.key) {
      case LEFT:
        this.mvLeft = true;
        break;
      case UP:
        this.mvUp = true;
        break;
      case RIGHT:
        this.mvRight = true;
        break;
      case DOWN:
        this.mvDown = true;
        break;
    }
  }

  keyupHandler(e: KeyboardEvent) {
    switch (e.key) {
      case LEFT:
        this.mvLeft = false;
        break;
      case UP:
        this.mvUp = false;
        break;
      case RIGHT:
        this.mvRight = false;
        break;
      case DOWN:
        this.mvDown = false;
        break;
    }
  }
}