import { EventHandler } from "../models/EventHandler"
import { Player } from "../models/Player"

export class PlayerEventService {

    constructor(private eventHandler: EventHandler, private player: Player) {}

    execute() {
        
        if (this.eventHandler.mvUp || this.eventHandler.mvDown || this.eventHandler.mvLeft || this.eventHandler.mvRight) {
            this.player.move({ 
                mvDown: this.eventHandler.mvDown,
                mvLeft: this.eventHandler.mvLeft,
                mvRight: this.eventHandler.mvRight,
                mvUp: this.eventHandler.mvUp
             })
        }
    }
}