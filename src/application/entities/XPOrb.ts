import { UUID, generateUUID } from "../utils/utils"

export class XPOrb {
    id: UUID = generateUUID()
    x: number
    y: number
    width: number
    height: number
    value: number
    color: string

    constructor({ x, y, value=1 }: Partial<XPOrb>) {
        this.id = generateUUID()
        this.x = x
        this.y = y
        this.width = 5
        this.height = 10
        this.value = value
        this.color = "#55AAFF"

        this.animate(true)
    }

    animate(goingUp: boolean) {
        if (goingUp) {
            this.color = "#AACCFF"
            this.y += 2
        } else {
            this.color = "#55AAFF"
            this.y -= 2
        }

        setTimeout(() => this.animate(!goingUp), 500)
    }
}