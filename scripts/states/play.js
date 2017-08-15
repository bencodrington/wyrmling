var Play = function(game) {
    var play = {
        create: function create() {
            //  Enable Arcade Physics System
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.time.advancedTiming = true;    //  Required for accessing time.fps
            
            game.GROUND_Y = game.world.height - 12;
            game.worldSpeed = 5

            game.objectData = require('../data/objects');
            game.utils      = require('../utils');

            //  Background
            game.add.sprite(0, 0, 'sky');

            //  Ground
            game.platforms = game.add.group();

            // Spawnables
            game.spawnables = game.add.group();

            // Objects that have a trigger() function that is called upon overlap with the dragon
            game.triggerables = [];

            //  Enable physics for any object in this group
            game.platforms.enableBody = true;
            this.ground = game.add.tileSprite(0, game.GROUND_Y, 64, 16, 'ground');
            game.physics.arcade.enable(this.ground);
            game.platforms.add(this.ground);
            this.ground.body.immovable = true;

            // Spawner
            var createSpawner = require('../spawner');
            this.spawner = createSpawner(game);

            //  Dragon
            var createDragon = require('../dragon');
            game.dragon = createDragon(game);
            game.dragon.bringToTop();

            //  Score
            game.score = 0;
            game.scoreText = game.add.bitmapText(1, game.GROUND_Y + 3, 'pixeled', 'score: 0', 5);

            game.addScore = (points) => {
                game.score += points;
                game.scoreText.text = 'score: ' + game.score;
                game.dragon.checkForLevelUp();
            }

            game.gameOver = () => {
                this.spawner.stopSpawning();
                this.spawner.destroy();
                game.state.add('game-over', require('./gameOver')(game));
                game.state.start('game-over');
            }
        },

        update: function update() {

            //  Check for trigger-type collisions
            game.physics.arcade.overlap(game.dragon, game.triggerables, (dragon, triggerable) => {
                triggerable.trigger(dragon);
            });

            //  Move ground
            this.ground.tilePosition.x -= game.worldSpeed / 60;

        },

        render: function() {
            //  Print FPS
            // game.debug.text(game.dragon.body.velocity.y || '--', 52, game.world.height, "#00ff00", "10px Courier");
            // game.debug.body(game.dragon);
        }
    };

    return play;
};

module.exports = Play;