export class CachedImages {

    private static instance: CachedImages;

    player: HTMLImageElement
    cyclop: HTMLImageElement
    spirit: HTMLImageElement
    dragon: HTMLImageElement
    crawler: HTMLImageElement

    soundAttackLevel_1: HTMLImageElement


    constructor() {
        this.createEnemies()
        this.createSkills()
    }
    
    createEnemies() {
        this.player = new Image()
        this.player.src = "img/players/standard/spritesheet.png"
        this.spirit = new Image()
        this.spirit.src = "img/enemies/spirit.png"
        this.cyclop = new Image()
        this.cyclop.src = "img/enemies/cyclope.png"
        this.dragon = new Image()
        this.dragon.src = "img/enemies/dragon.png"
        this.crawler = new Image()
        this.crawler.src = "img/enemies/crawler.png"
    }

    createSkills() {
        this.soundAttackLevel_1 = new Image()
        this.soundAttackLevel_1.src = "img/skills/sound_attack_level_1.png"
    }
    
    getPlayer() {
        return this.player
    }
    
    getSpirit() {
        return this.spirit
    }
    
    getCyclop() {
        return this.cyclop
    }
    
    getDragon() {
        return this.dragon
    }
    
    getCrawler() {
        return this.crawler
    }

    getSoundAttackLevel_1() {
        return this.soundAttackLevel_1
    }

    public static getInstance(): CachedImages {
        if (!CachedImages.instance) {
            CachedImages.instance = new CachedImages();
        }

        return CachedImages.instance;
    }
}