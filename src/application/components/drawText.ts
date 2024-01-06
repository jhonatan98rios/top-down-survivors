import { Camera } from "../models/Camera";

interface IdrawText{
    camera: Camera
    context: CanvasRenderingContext2D,
    curentValue: string,
    font: string,
    posX: number,
    posY: number,
}

export function drawText({ context, curentValue, font, camera, posX, posY }: IdrawText) {

    context.beginPath();

    context.font = font;
    context.fillText(
        curentValue.toString(), 
        Math.floor(camera.x + posX), 
        Math.floor(camera.y + posY)
    );

    context.closePath()
}