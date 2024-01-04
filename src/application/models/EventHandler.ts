import { SCREEN_WIDTH } from '../../constants'
import JoyStick, { StickStatus } from 'html5-joystick-new'

const LEFT = 'ArrowLeft'
const UP = 'ArrowUp'
const RIGHT = 'ArrowRight'
const DOWN = 'ArrowDown'


export class EventHandler {

  private static instance: EventHandler;

  mvLeft: boolean = false
  mvUp: boolean = false
  mvRight: boolean = false
  mvDown: boolean = false
  joystick?: JoyStick

  constructor() {
    this.keyboardEventListener()
    this.joystickEventListener()
  }

  keyboardEventListener() {
    window.addEventListener("keydown", this.keydownHandler.bind(this), false);
    window.addEventListener("keyup", this.keyupHandler.bind(this), false);
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


  joystickEventListener() {
    if (SCREEN_WIDTH <= 768) {
      this.joystick = new JoyStick(document.getElementById("joyDiv")!, { callback: (stickData: StickStatus) => {
        this.mvUp = stickData.cardinalDirection.includes("N");
        this.mvDown = stickData.cardinalDirection.includes("S");
        this.mvRight = stickData.cardinalDirection.includes("E");
        this.mvLeft = stickData.cardinalDirection.includes("W");
      }});
    }
  }


  public static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }

    return EventHandler.instance;
  } 
}