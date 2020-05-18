import { GameState } from "../GameState";

function collectStar (player, star)
{
    star.disableBody(true, true);
    GameState.score += 10
    console.log(this.stars.getLength()*10)
}

export abstract class BasicScene extends Phaser.Scene {
    clouds: Phaser.GameObjects.TileSprite
    door: any
    player: Phaser.Physics.Arcade.Sprite
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    platforms: Phaser.Physics.Arcade.StaticGroup;
    scoreText: Phaser.GameObjects.Text;
    stars: Phaser.Physics.Arcade.Group;

    private beforeCreate() {
        this.platforms = this.physics.add.staticGroup();
        this.stars = this.physics.add.group();

        this.clouds = this.add.tileSprite(0, 0, 750, 200, 'sky').setOrigin(0, 0);

        this.scoreText =  this.add.text(20, 20, 'Score:'+ GameState.score,{fill: '#000000'})
        this.player = this.physics.add.sprite(0, 450, 'catidle').setScale(.21);
        this.anims.create({
            key: "jumping",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 0,
                end: 8
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("catidle", {
                start: 0,
                end: 4
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("catrun", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: "glow",
            frames: this.anims.generateFrameNumbers('door', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        })

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    private afterCreate() {
        this.physics.add.collider(this.door, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.stars, this.platforms)

        this.player.setCollideWorldBounds(true)
        this.door.setCollideWorldBounds(true)

        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
    }

    abstract onCreate(): void;

    create() {
        this.beforeCreate();

        this.onCreate();

        this.afterCreate();
    }

    addDoor(x, y) {
        this.door = this.physics.add.sprite(x, y, 'door').setScale(1.4);
    }

    addGrass(x, y, z) {
        this.add.image(x,y, 'grass').setScale(z).setOrigin(0,0)
    }

    addStar(x,y){
        this.stars.create(x,y, 'star');
    }

    addPlatform(x,y,z){
        this.platforms.create(x, y, 'platform').setScale(z).refreshBody()
    }

    basicUpdate() {
        this.clouds.tilePositionX += 0.3;
        this.door.anims.play('glow', true);
        if (GameState.active == true) {
            if (this.cursors.right.isDown) {
                this.player.setVelocityX(160)
                this.player.flipX = false
                this.player.anims.play('run', true)

            } else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160)
                this.player.flipX = true
                this.player.anims.play('run', true)
            } else {
                this.player.setVelocityX(0)
                this.player.anims.play('idle', true)
            }

            if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.touching.down) {
                //gameState.player.anims.play('jumping', true)
                this.player.setVelocityY(-350)
            }

            this.scoreText.setText('Score:'+ GameState.score)
        }
    }
}