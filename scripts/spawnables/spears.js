var createSpears = (x, y, game) => {
    var spears = game.add.sprite(x, y, 'spears-small');
    game.triggerables.push(spears);
    spears.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(spears);

    spears.body.setSize(6, 6, -3, -1)

    spears.update = () => {
        spears.body.velocity.x = -game.worldSpeed;
    }

    spears.trigger = (dragon) => {
        game.gameOver();
    }

    return spears;
};

module.exports = createSpears;