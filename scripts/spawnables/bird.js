var createBird = (x, y, game) => {
    var bird = game.add.sprite(x, y, 'bird');
    game.physics.arcade.enable(bird);
    game.triggerables.push(bird);

    bird.SIGHT_RADIUS = 25;
    bird.MAX_FLY_SPEED = 15;

    bird.isFlying = false;
    bird.flySpeedX = 0;
    bird.flySpeedY = 0;

    //  Enable despawning upon entering the screen
    bird.events.onEnterBounds.add(() => {
        bird.outOfBoundsKill = true;
    });

    bird.update = () => {
        //  Check if bird should start flying
        if (!bird.isFlying && game.physics.arcade.distanceBetween(bird, game.dragon) < bird.SIGHT_RADIUS && !game.dragon.isDucking) {
            bird.isFlying = true;
            bird.animations.add('fly', [0, 1, 2, 3]);
            bird.animations.play('fly', 20, true);
        }

        if (bird.isFlying) {
            if (bird.flySpeedX < bird.MAX_FLY_SPEED) {
                bird.flySpeedX += 1;
            }
            if (bird.flySpeedY < bird.MAX_FLY_SPEED) {
                bird.flySpeedY += 1;
            }
        }

        bird.body.velocity.x = -game.worldSpeed + bird.flySpeedX;
        bird.body.velocity.y = -bird.flySpeedY;
    }

    bird.trigger = (dragon) => {
        bird.kill();
        game.addScore(game.objectData.bird.xp);
    }
    return bird;
};

module.exports = createBird;