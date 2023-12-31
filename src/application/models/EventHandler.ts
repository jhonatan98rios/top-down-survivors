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
      case 'a':
        this.mvLeft = true;
        break;
      case UP:
      case 'w':
        this.mvUp = true;
        break;
      case RIGHT:
      case 'd':
        this.mvRight = true;
        break;
      case DOWN:
      case 's':
        this.mvDown = true;
        break;
    }
  }

  keyupHandler(e: KeyboardEvent) {
    switch (e.key) {
      case LEFT:
      case 'a':
        this.mvLeft = false;
        break;
      case UP:
      case 'w':
        this.mvUp = false;
        break;
      case RIGHT:
      case 'd':
        this.mvRight = false;
        break;
      case DOWN:
      case 's':
        this.mvDown = false;
        break;
    }
  }
}