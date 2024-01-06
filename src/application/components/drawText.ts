import { Camera } from "../entities/Camera";

interface IdrawText{
    camera?: Camera
    context: CanvasRenderingContext2D,
    value: string,
    font: string,
    posX: number,
    posY: number,
}

export function drawText({ context, value, font, camera=null, posX, posY }: IdrawText) {

    context.beginPath();

    context.font = font;
    context.fillText(
        value, 
        camera ? Math.floor(camera.x + posX) : posX, 
        camera ? Math.floor(camera.y + posY) : posY
    );

    context.closePath()
}