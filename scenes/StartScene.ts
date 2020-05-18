import { GameState } from "../GameState"
import { BasicScene } from "./BasicScene"


export class StartScene extends BasicScene {

    constructor() {
        super({
            key: 'StartScene'
        })
    }

    preload() {
        this.load.spritesheet('catrun', '../assets/run.png', {
            frameWidth: 296,
            frameHeight: 430
        })
        this.load.spritesheet('catidle', '../assets/idle.png', {
            frameWidth: 291,
            frameHeight: 434
        })
        this.load.spritesheet('cat', '../assets/catjumping.png', {
            frameWidth: 200,
            frameHeight: 175
        })
        this.load.image('grass', '../assets/grass.png')
        this.load.image('sky', '../assets/sky.png')
        this.load.image('ground', '../assets/ground.png')
        this.load.spritesheet('door', '../assets/door.png', {
            frameWidth: 48,
            frameHeight: 48
        })

        this.load.image('platform', '../assets/platform.png')
        this.load.image('star', '../assets/star.png')
    }

    onCreate(): void {

        GameState.active = true;

        //backgroundObjects
        this.add.text(170, 240, '>> run to the right to start', {
            fill: '#00000',
            fontSize: '25px'
        })

        this.platforms.create(375, 500, 'ground')
        this.addGrass(270, 443, 0.6)
        this.addDoor(700, 470);

        this.physics.add.overlap(this.player, this.door, () => {

            this.scene.stop('StartScene')
            this.scene.start('Level1Scene')
        })
    }
  
    update() {
        super.basicUpdate();
    }
}