import { Camera } from "./application/models/Camera";
import { Canvas } from "./application/models/Canvas";
import { EventHandler } from "./application/models/EventHandler";
import { Game } from "./application/models/Game";
import { Scenario } from "./application/models/Scenario";
import { DIRECTION, Player } from "./application/models/Player";

import { SCREEN_WIDTH, SCREEN_HEIGHT, BLOCK_IMAGE_SIZE, BLOCK_SIZE } from "./constants"
import { PlayerEventService } from "./application/services/PlayerEventService";
import { layers } from "./database/scenarios/mock";
import { Enemy } from "./application/models/Enemy";

const htmlCanvas = document.querySelector("canvas") as HTMLCanvasElement
htmlCanvas.width = SCREEN_WIDTH
htmlCanvas.height = SCREEN_HEIGHT

const context = htmlCanvas.getContext("2d") as CanvasRenderingContext2D


const playerSpritesheet = new Image()
playerSpritesheet.src = "img/players/standard/spritesheet.png"


const scenario = new Scenario({
    blockSize: BLOCK_SIZE,
    blockImageSize: BLOCK_IMAGE_SIZE,
	layers // Replace by the layers
})

const player = new Player({
	x: SCREEN_WIDTH / 2, 
	y: SCREEN_HEIGHT / 2,
	width: 200 / 4,
	height: 400 / 4,
	speed: 2,
	srcX: 0,
	srcY: 100,
	direction: DIRECTION.RIGHT,
    scenario: scenario
})


const enemy = new Enemy({
	x: (SCREEN_WIDTH / 2) * 500, 
	y: SCREEN_HEIGHT / 2,
	width: 200 / 4,
	height: 400 / 4,
	speed: 2,
	srcX: 0,
	srcY: 100,
	direction: DIRECTION.LEFT,
    scenario: scenario
})


const camera = new Camera({
    x: 0,
	y: 0,
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT
})

const canvas = new Canvas({ 
	context, 
    scenario, 
	camera,
	player,
	playerSpritesheet,
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT,
})

const eventHandler = new EventHandler()

const playerEventService = new PlayerEventService(eventHandler, player)

const game = new Game({ 
    player, 
    canvas, 
    scenario,
	eventHandler,
	camera,
	playerEventService
})

playerSpritesheet.addEventListener("load", function() {
	requestAnimationFrame(game.loop.bind(game));
}, false);

