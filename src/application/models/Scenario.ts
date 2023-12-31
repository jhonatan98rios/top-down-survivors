import { BLOCK_IMAGE_SIZE, BLOCK_SIZE } from '../../constants';
import { ScenarioLayers, layers } from '../../database/scenarios/mock'

export class Scenario {

    private static instance: Scenario;

    blockSize: number
    blockImageSize: number
    layers: ScenarioLayers

    constructor() {
        this.blockSize = BLOCK_SIZE
        this.blockImageSize = BLOCK_IMAGE_SIZE
        this.layers = layers
    }

    public static getInstance(): Scenario {
        if (!Scenario.instance) {
            Scenario.instance = new Scenario();
        }
    
        return Scenario.instance;
      } 
}