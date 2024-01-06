interface INotification {
    context: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    width: number,
    height: number
}

export function drawNotification({ context, height, width, posX, posY }: INotification) {

    context.beginPath();
    context.strokeStyle = '#FFFFFF'
    context.fillStyle = "#555555"

    context.strokeRect(
        Math.floor(posX-1), 
        Math.floor(posY-1), 
        width+2, height+2
    )

    context.fillRect(
        posX, 
        posY, 
        width, 
        height
    );

    context.closePath()
}