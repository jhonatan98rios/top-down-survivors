import { Camera } from "../models/Camera";

interface IdrawText{
    camera: Camera
    context: CanvasRenderingContext2D,
    curentValue: string,
    posX: number,
    posY: number,
}

export function drawText({ context, curentValue, camera, posX, posY }: IdrawText) {

    context.beginPath();

    context.font = "30px Arial";
    context.fillText(
        curentValue.toString(), 
        Math.floor(camera.x + posX), 
        Math.floor(camera.y + posY)
    );

    context.closePath()
}