import { Camera } from "./application/models/Camera";
import { Canvas } from "./application/models/Canvas";
import { EventHandler } from "./application/models/EventHandler";
import { Game } from "./application/models/Game";
import { Scenario } from "./application/models/Scenario";
import { DIRECTION, Player } from "./application/models/Player";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./constants"
import { PlayerEventService } from "./application/services/PlayerEventService";
import { Enemy } from "./application/models/Enemy";
import { EnemyService } from "./application/services/EnemyService";

const htmlCanvas = document.querySelector("canvas") as HTMLCanvasElement
htmlCanvas.width = SCREEN_WIDTH
htmlCanvas.height = SCREEN_HEIGHT

Scenario.getInstance()
Player.getInstance()

Camera.getInstance()

Canvas.getInstance()

EventHandler.getInstance()

Game.getInstance()

PlayerEventService.getInstance()
EnemyService.getInstance()