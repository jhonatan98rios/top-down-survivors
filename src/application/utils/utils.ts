export type UUID = string

export function generateUUID(): UUID {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16) as UUID
    });
}

export type Vector2D = {x: number, y: number}
export type Element2D = Vector2D & { width: number, height: number }

export function isThereIntersection(elementA: Element2D, elementB:Element2D) {
    return (elementA.x <= elementB.x + elementB.width) && (elementA.x + elementA.width >= elementB.x) && (elementA.y <= elementB.y + elementB.height && elementA.y + elementA.height >= elementB.y)
}

export function calculate2DMovement(body: Vector2D, target: Vector2D): Vector2D {
    const deltaX = target.x - body.x
    const deltaY = target.y - body.y
    const distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))

    return {
        x: deltaX / distance,
        y: deltaY / distance
    }
}




/* 

positionAnimation(player: Player) {
        
    const { x: directionX, y: directionY } = calculate2DMovement(this, player)
    const velocityX = directionX * this.speed
    const velocityY = directionY * this.speed

    this.x += velocityX
    this.y += velocityY
}

positionAnimation(player: Player) {
        
    const { x: directionX, y: directionY } = calculate2DMovement(this, player)
    const velocityX = directionX * this.speed
    const velocityY = directionY * this.speed

    const newX = this.x + velocityX
    const newY = this.y + velocityY

    let shouldMoveX = !this.checkCollision({ x: newX, y: this.y, height: this.height, width: this.width }, player.game.enemyService.enemies)
    let shouldMoveY = !this.checkCollision({ y: newY, x: this.x, height: this.height, width: this.width }, player.game.enemyService.enemies)

    this.x = shouldMoveX ? newX : velocityX
    this.y = shouldMoveY ? newY : velocityY
}


public checkCollision(body: Element2D, enemies: Enemy[]) {

    for (let index = 0; index < enemies.length; index++) {
        let enemy = enemies[index]

        if (isThereIntersection(this, enemy)) {
            return true
        }
    }

    return false
} */