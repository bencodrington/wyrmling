var createCamp = (x, y, game) => {
    var camp = game.add.sprite(x, y, 'camp');
    camp.anchor.setTo(0.5, 1);  //  Set anchor to bottom middle
    game.physics.arcade.enable(camp);
    camp.MAX_CAMPER_COUNT = 3;  //  Maximum number of campers that can be spawned each reset
    camp.CAMPER_RADIUS = 5;     //  How far from camp can campers be spawned, horizontally

    //  Re-enable pool functionality upon re-entering the screen
    camp.events.onEnterBounds.add(() => {
        camp.outOfBoundsKill = true;
    });

    camp.create = () => {
        var camper;
        var createCamper = require('./camper');
        camp.camperPool = [];

        for (var i = 0; i < camp.MAX_CAMPER_COUNT; i++) {
            camper = createCamper(-1000, -1000, game);
            camper.checkWorldBounds = true; //  Deactivate if off-screen
            camper.outOfBoundsKill = true;
            camper.kill();
            camp.camperPool.push(camper);
        }

        camp.animations.add('burn', [0, 1, 2, 3, 4, 5, 6, 7]);
        camp.animations.play('burn', 8, true);
    }

    camp.update = () => {
        camp.body.velocity.x = -game.worldSpeed;
    }

    camp.onReset = () => {
        var camperCount = game.rnd.integerInRange(1, 3);
        var camper;
        for (var i = 0; i < camperCount; i++) {
            var x = camp.x + game.rnd.integerInRange(-5, 5);    //  Spawn somewhere around campfire
            //TODO: flip sprite if to the right of the campfire
            var y = camp.y;
            camper = camp.camperPool[i];
            camper.reset(x, y);
            camper.onReset();
        }
        //  Don't kill immediately when spawned out of bounds
        camp.outOfBoundsKill = false;
    }

    camp.create();
    return camp;
};

module.exports = createCamp;