import { Camera } from "../entities/Camera";

interface IAnimatedBar {
    camera: Camera
    context: CanvasRenderingContext2D,
    curentValue: number,
    maxValue: number,
    minColor: string,
    maxColor: string,
    posX: number,
    posY: number,
    width: number,
    height: number
}

export function drawAnimatedBar({ context, curentValue, maxValue, camera, minColor, maxColor, height, width, posX, posY }: IAnimatedBar) {

    context.beginPath();

    context.strokeStyle = '#FFFFFF'
    context.fillStyle = curentValue > maxValue / 2 
        ? maxColor : minColor


    context.strokeRect(
        Math.floor(camera.x + posX), 
        Math.floor(camera.y + posY), 
        width+2, height
    )

    context.fillRect(
        Math.floor(camera.x + posX+1), 
        Math.floor(camera.y + posY+1), 
        Math.floor((curentValue / maxValue) * width), 
        height-2
    );

    context.closePath()
}