var createTree = (x, y, game) => {
    var tree = game.add.sprite(x, y, 'tree');
    tree.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(tree);

    tree.NEST_PROBABILITY = 1/3;    //  Likelihood that the tree will have a nest in it
    tree.NEST_X = -3;               //  Relative position of nest to tree
    tree.NEST_Y = -16;
    tree.nest = null;               //  Current nest object

    tree.createNest = require('./nest');

    tree.update = () => {
        tree.body.velocity.x = -game.worldSpeed;
    }
    
    tree.onReset = () => {
        var rnd = game.rnd.frac();
        if (rnd < tree.NEST_PROBABILITY) {
            //  Spawn nest
            tree.nest = tree.createNest(tree.x + tree.NEST_X, tree.y + tree.NEST_Y, game);
            game.spawnables.addChild(tree.nest);
        }
    }

    // Delete nest object when tree is deactivated
    tree.events.onKilled.add(() => {
        if (tree.nest != null) {
            tree.nest.destroy();
        }
    });

    return tree;
}

module.exports = createTree;