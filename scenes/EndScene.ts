import { BasicScene } from "./BasicScene";
import { GameState } from "../GameState";

export class EndScene extends BasicScene{


    constructor() {
        super({key:'EndScene'});    
    }

    onCreate(){
     GameState.active = true;
     this.cameras.main.setBounds(0, 0, 700, 1100);
     this.physics.world.setBounds(0, 0, 700, 1100);
     this.cameras.main.startFollow(this.player, true)
     this.player.setPosition(5, 1050)

     this.platforms.create(375, 1099, 'ground')
     this.cameras.main.startFollow(this.player)

     this.addPlatform(180, 980, 1)
     this.addPlatform(40, 900, 1)
     this.addPlatform(240, 800, 1)
     this.addPlatform(350, 700, 1)
     this.addPlatform(540, 600, 1)
     this.addPlatform(640, 500, 1)
     this.addPlatform(540, 400, 1)
     this.addPlatform(430, 300, 1)
     this.addPlatform(330, 200, 1)


     this.addDoor(360, 250);
     //this.addGrass(100,2000, 1)
     //this.addGrass(130,2000, 1.2)
    }

    update(){
        this.basicUpdate();
    }
}