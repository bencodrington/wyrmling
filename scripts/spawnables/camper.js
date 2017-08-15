var createCamper = (x, y, game) => {
    var camper = game.add.sprite(x, y, 'camper');
    game.triggerables.push(camper);
    camper.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(camper);
    camper.MAX_RUN_SPEED = 10;
    camper.SIGHT_RADIUS = 20;   //  How far from the dragon the camper will be before it starts to run
    camper.events.onEnterBounds.add(() => {
        camper.outOfBoundsKill = true;
    });

    
    camper.animations.add('sit', [0]);
    camper.animations.add('run', [8, 9, 10, 11, 12, 13, 14, 15]);

    camper.onReset = () => {
        camper.isRunning = false;
        camper.runSpeed = 0;
        camper.outOfBoundsKill = false;
        camper.animations.play('sit', 20, false);
        camper.animations.stop();
        camper.frame = 0;
    }

    camper.update = () => {
        //  Check if camper should start running
        if (!camper.isRunning && game.physics.arcade.distanceBetween(camper, game.dragon) < camper.SIGHT_RADIUS && !game.dragon.isDucking) {
            camper.isRunning = true;
            camper.animations.play('run', 15, true);
        }

        if (camper.isRunning && camper.runSpeed < camper.MAX_RUN_SPEED) {
            camper.runSpeed += 1;
        }
        camper.body.velocity.x = -game.worldSpeed + camper.runSpeed;
    }

    camper.trigger = (dragon) => {
        if (dragon.isDescending()) {
            //  Eat camper
            camper.kill();
            game.addScore(game.objectData.camper.xp);
        }
        
    }

    camper.onReset();
    return camper;
};

module.exports = createCamper;