var level1 = (game) => {
    game.dragon.moveSpeed = game.objectData.dragon.level1MoveSpeed;
    game.dragon.jumpVelocity = game.objectData.dragon.level1JumpVelocity;
}

var createDragon = (game) => {
    var dragon = game.add.sprite(32, game.GROUND_Y, 'dragon');
    dragon.anchor.setTo(0.5, 1);    // set anchor to bottom middle
    game.physics.arcade.enable(dragon);
    dragon.body.collideWorldBounds = true;
    dragon.body.setSize(6, 7, -1, 0);
    dragon.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7]);
    dragon.animations.add('duck', [8, 9, 10, 11, 12, 13, 14, 15]);
    dragon.animations.play('run', 8, true);

    dragon.body.gravity.y   = 300;
    dragon.DUCKING_MODIFIER = 0.25; //  fraction of full speed the dragon can move while ducking
    dragon.LEVEL_SCORES     = [200]
    dragon.LEVEL_FUNCTIONS  = [level1];

    dragon.isDucking        = false;
    dragon.level            = 0;
    dragon.moveSpeed        = game.objectData.dragon.moveSpeed;     //  horizontal acceleration
    dragon.jumpVelocity     = game.objectData.dragon.jumpVelocity;  //  affects how high the dragon can jump
    

    dragon.isDescending = () => {
        return dragon.body.velocity.y > 0;
    }

    dragon.checkForLevelUp = () => {
        var lvl = dragon.level;
        if (lvl >= dragon.LEVEL_SCORES.length) {
            return;
        }
        if (game.score >= dragon.LEVEL_SCORES[lvl]) {
            dragon.LEVEL_FUNCTIONS[lvl](game);
            dragon.level++;
        }
    }

    dragon.update = () => {
        //  Collide dragon with platforms
        var hitPlatform = game.physics.arcade.collide(dragon, game.platforms);

        var cursors = game.input.keyboard.createCursorKeys();

        //  Jumping
        if (cursors.up.isDown && dragon.body.touching.down && hitPlatform) {
            dragon.body.velocity.y = dragon.jumpVelocity;
        }
    
        //  Ducking
        if (cursors.down.isDown && !cursors.up.isDown &&
        dragon.body.touching.down && hitPlatform) {
            dragon.isDucking = true;
            dragon.animations.play('duck', 8, true);
        } else {
            dragon.isDucking = false;
            dragon.animations.play('run', 8, true);
        }

        // Movement
        dragon.body.velocity.x = 0;
        game.worldSpeed = 5;    // TODO: replace w/ variable
        if (cursors.left.isDown) {          //  Move Left
            dragon.body.velocity.x = -dragon.moveSpeed;
            game.worldSpeed -= 4 * dragon.DUCKING_MODIFIER;
        } else if (cursors.right.isDown) {  // Move Right
            dragon.body.velocity.x = dragon.moveSpeed;
            game.worldSpeed += 4 * dragon.DUCKING_MODIFIER;
        } else {
            // TODO: stop animations
        }
        if (dragon.isDucking) {
            dragon.body.velocity.x *= dragon.DUCKING_MODIFIER;
        }
        
    }

    return dragon;
}

module.exports = createDragon;