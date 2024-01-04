import { UUID, generateUUID } from "../utils/utils"

export class XPOrb {
    id: UUID = generateUUID()
    x: number
    y: number
    width: number
    height: number
    color: string

    constructor({ x, y }: Partial<XPOrb>) {
        this.id = generateUUID()
        this.x = x
        this.y = y
        this.width = 5
        this.height = 10
        this.color = "#55AAFF"
    }
}