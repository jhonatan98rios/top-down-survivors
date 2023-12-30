interface ICamera { 
    x: number,
    y: number,
    width: number,
    height: number
}

export class Camera {
    x: number
    y: number;
    width: number;
    height: number;
    
    constructor({ x, y, width, height }: ICamera) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
}