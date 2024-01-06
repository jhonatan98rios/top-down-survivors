interface IButton{
    value: string,
    posX: number,
    posY: number,
    width: number, 
    height: number,
    callback: () => void
}

export function drawButton({ value, posX, posY, width, height, callback }: IButton) {
    const btn = document.createElement("button")
    btn.style.borderColor = "#FFFFFF"
    btn.style.backgroundColor = "transparent"
    btn.style.width = width + 'px'
    btn.style.height = height + 'px'
    btn.style.position = "absolute"
    btn.style.zIndex = "99"
    btn.style.top = posY + "px"
    btn.style.left = posX + "px"

    
    var text = document.createElement('p')
    text.innerHTML = value
    text.style.color = "#FFFFFF"
    text.style.margin = "0px"
    text.style.padding = "0px"
    btn.appendChild(text)

    btn.onmouseup = callback

    document.body.appendChild(btn)
}