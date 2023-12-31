import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";

export class Camera {

    private static instance: Camera;

    x: number
    y: number;
    width: number;
    height: number;
    
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;
    }

    innerLeftBoundary() {
        return this.x + (this.width * 0.25);
    }

    innerTopBoundary() {
        return this.y + (this.height * 0.25);
    }

    innerRightBoundary() {
        return this.x + (this.width * 0.75);
    }

    innerBottomBoundary() {
        return this.y + (this.height * 0.75);
    }


    public static getInstance(): Camera {
        if (!Camera.instance) {
            Camera.instance = new Camera();
        }

        return Camera.instance;
    }
}