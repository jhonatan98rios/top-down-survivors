import { ScenarioLayers } from '../../database/scenarios/mock'

interface IScenario {
    blockSize: number, 
    blockImageSize: number,
    layers: ScenarioLayers
}

export class Scenario {
    blockSize: number
    blockImageSize: number
    layers: ScenarioLayers

    constructor({ blockSize, blockImageSize, layers }: IScenario) {
        this.blockSize = blockSize
        this.blockImageSize = blockImageSize
        this.layers = layers
    }
}