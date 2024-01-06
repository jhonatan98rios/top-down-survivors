import { drawNotification } from './drawNotification'
import { drawText } from './drawText'

interface IDeathNotification {
    context: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    width: number,
    height: number
}

export function drawDeathNotification({ context, height, width, posX, posY }: IDeathNotification) {

    drawNotification({
        context, height, width, posX, posY
    })

    context.fillStyle = "#FFFFFF"

    drawText({
        context,
        value: "Você morreu!",
        font: "32px Arial",
        posX: posX + (width / 2) - 100,
        posY: posY + (height / 2),
    })
}