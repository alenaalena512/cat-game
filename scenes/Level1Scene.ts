import { GameState } from "../GameState";
import { BasicScene } from "./BasicScene";


export class Level1Scene extends BasicScene {
    stars: Phaser.Physics.Arcade.Group;
    constructor() {
        super({
            key: 'Level1Scene'
        })
    }

    onCreate() {

        GameState.active = true;
        
        this.addGrass(-10, 450, .4)
        this.addGrass(200, 440, .5)
        this.addGrass(600, 440, .5)
        this.addGrass(300, 450, .4)

        this.addPlatform(640,370, 0.8)
        this.addPlatform(500,190, 0.8)
        this.addPlatform(350,290, 0.8)
        this.addPlatform(200,390, 0.8)
 
        this.addStar(100,0)
        this.addStar(170,0)
        this.addStar(250,0)
        this.addStar(300,0)
        this.addStar(370,0)
        this.addStar(550, 0)

        this.addDoor(650,200);
        
        this.platforms.create(375, 500, 'ground')

   
        this.physics.add.overlap(this.player, this.door, () => {
          if(GameState.score == this.stars.getLength()*10){
            this.scene.stop('Level1Scene')
            this.scene.start('EndScene');
            }
        })

    }

    update() {
        super.basicUpdate();
    }
}
