import { EventHandler } from "../entities/EventHandler"
import { Player } from "../entities/Player"

export class PlayerEventService {

    private static instance: PlayerEventService;

    eventHandler: EventHandler
    player: Player

    constructor() {
        this.eventHandler = EventHandler.getInstance()
        this.player = Player.getInstance()
    }

    execute() {
        this.player.update({ 
            mvDown: this.eventHandler.mvDown,
            mvLeft: this.eventHandler.mvLeft,
            mvRight: this.eventHandler.mvRight,
            mvUp: this.eventHandler.mvUp
         })
    }

    public static getInstance(): PlayerEventService {
        if (!PlayerEventService.instance) {
            PlayerEventService.instance = new PlayerEventService()
        }
    
        return PlayerEventService.instance
    }
}