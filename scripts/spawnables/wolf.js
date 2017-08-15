var createWolf = (x, y, game) => {
    var wolf = game.add.sprite(x, y, 'wolf');
    game.triggerables.push(wolf);
    wolf.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(wolf);

    wolf.START_MOVE_SPEED = 6;
    wolf.MAX_MOVE_SPEED = 30;
    wolf.MIN_MOVE_SPEED = -5;
    wolf.moveSpeed = wolf.START_MOVE_SPEED;
    wolf.isLookingForDragon = false;

    wolf.update = () => {
        if (wolf.isLookingForDragon && game.dragon.isDucking) {
            //  Searching but cant see dragon, slow down
            wolf.moveSpeed = game.utils.clamp(wolf.MIN_MOVE_SPEED, wolf.moveSpeed - 1, wolf.MAX_MOVE_SPEED);
        } else if (wolf.moveSpeed < wolf.MAX_MOVE_SPEED) {
            //  Spotted dragon or is still approaching, speed up
            wolf.moveSpeed = game.utils.clamp(wolf.MIN_MOVE_SPEED, wolf.moveSpeed + 1, wolf.MAX_MOVE_SPEED);
        } else if (!wolf.isLookingForDragon) {
            //  Finished approaching, start looking for dragon
            wolf.isLookingForDragon = true;
        }

        wolf.body.velocity.x = -game.worldSpeed + wolf.moveSpeed;
    }

    wolf.trigger = (dragon) => {
        game.gameOver();
    }

    return wolf;
};

module.exports = createWolf;