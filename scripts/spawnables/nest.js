var createNest = (x, y, game) => {
    var nest = game.add.sprite(x, y, 'nest');
    game.triggerables.push(nest);
    nest.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(nest);

    nest.MAX_BIRD_COUNT = 2;
    nest.MAX_BIRD_DISTANCE = 1; //  How far away from the nest center birds can spawn
    nest.hasEggs = true;

    nest.create = () => {
        var createBird = require('./bird');
        var rnd = game.rnd.between(0, nest.MAX_BIRD_COUNT);
        for (var i = 0; i < rnd; i++) {
            var rndOffset = game.rnd.between(-nest.MAX_BIRD_DISTANCE, nest.MAX_BIRD_DISTANCE);
            //  Spawn bird
            createBird(nest.x + rndOffset, nest.y + rndOffset, game);
        }
    }

    nest.update = () => {
        nest.body.velocity.x = -game.worldSpeed;
    }

    nest.trigger = () => {
        if (nest.hasEggs) {
            nest.hasEggs = false;
            nest.loadTexture('nest-empty');
            game.addScore(game.objectData.nest.xp);
        }
        
    }

    nest.create();
    return nest;
};

module.exports = createNest;