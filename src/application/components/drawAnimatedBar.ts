interface IAnimatedBar {
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

export function drawAnimatedBar({ context, curentValue, maxValue, minColor, maxColor, height, width, posX, posY }: IAnimatedBar) {

    context.beginPath();

    context.strokeStyle = '#FFFFFF'
    context.fillStyle = curentValue > maxValue * 0.6
        ? maxColor : minColor


    context.strokeRect(
        Math.floor(posX), 
        Math.floor(posY), 
        width+2, height
    )

    context.fillRect(
        Math.floor(posX + 1), 
        Math.floor(posY + 1), 
        Math.floor((curentValue / maxValue) * width), 
        height-2
    );

    context.closePath()
}