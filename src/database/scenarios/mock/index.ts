export type Element = {
    image: HTMLImageElement,
    width: number,
    height: number,
    x: number,
    y: number
}

export type ScenarioLayers = {
    [key: string]: Element[]
}

const CanvasImage = (src: string ) => {
    let img = new Image()
    img.src = src
    return img
}


const WIDTH = 2064 * 1024
const HEIGHT = 1152 * 1024

export const layers: ScenarioLayers = {
    belowThePlayers: [
        {
            image: CanvasImage("img/stages/pattern.png"),
            width: WIDTH,
            height: HEIGHT,
            x: -(WIDTH / 2),
            y: -(HEIGHT / 2)
        },
    ],

    aboveThePlayers: [
        // {
        //     image: CanvasImage("img/layers/houses-top.png"),
        //     width: 2064,
        //     height: 1152,
        //     x: 0,
        //     y: 0
        // },
    ]
}