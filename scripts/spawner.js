var createSpawner = function(game) {
    var spawner = game.add.sprite(0, 0);
    spawner.SPAWN_RATE          = 8000; //  ms between object spawns
    spawner.MAX_CAMP_COUNT      = 10;   //  Largest number of camp objects that can be on screen at any given time
    spawner.MAX_TREE_COUNT      = 10;   //  Largest number of tree objects that can be on screen at any given time
    spawner.MAX_WOLF_COUNT      = 10;   //  Largest number of wolf objects that can be on screen at any given time
    spawner.MAX_SPEARS_COUNT    = 10;   //  Largest number of spears objects that can be on screen at any given time
    spawner.TREE_SPAWN_RATE_MIN = 3000; //  Range of ms between tree spawns
    spawner.TREE_SPAWN_RATE_MAX = 5000; 

    //  Start spawn timers
    spawner.timers = [];
    var enemyTimer = setTimeout(() => {
        spawner.spawn();
    }, 1000);
    spawner.timers.push(enemyTimer);

    var treeTimer = setTimeout(() => {
        spawner.onTreeTimeout();
    }, 1000);
    spawner.timers.push(treeTimer);
    
    spawner.create = () => {
        spawner.trees   = game.add.group(game.spawnables);
        spawner.camps   = game.add.group(game.spawnables);
        spawner.wolves  = game.add.group(game.spawnables);
        spawner.spears  = game.add.group(game.spawnables);

        // Create camp object pool and deactivate camps
        var createCamp = require('./spawnables/camp');
        spawner.campPool = spawner.createPool(createCamp, spawner.MAX_CAMP_COUNT, spawner.camps);

        // Create tree object pool and deactivate trees
        var createTree = require('./spawnables/tree');
        spawner.treePool = spawner.createPool(createTree, spawner.MAX_TREE_COUNT, spawner.trees);

        // Create wolf object pool and deactivate wolves
        var createWolves = require('./spawnables/wolf');
        spawner.wolfPool = spawner.createPool(createWolves, spawner.MAX_WOLF_COUNT, spawner.wolf);

        // Create spears object pool and deactivate spears
        var createSpears = require('./spawnables/spears');
        spawner.spearsPool = spawner.createPool(createSpears, spawner.MAX_SPEARS_COUNT, spawner.spears);
    }

    spawner.onTreeTimeout = () => {
        spawner.spawnTree();
        var treeTimerLength = game.rnd.between(spawner.TREE_SPAWN_RATE_MIN, spawner.TREE_SPAWN_RATE_MAX);
        spawner.timers[1] = setTimeout(spawner.onTreeTimeout, treeTimerLength);
    }

    spawner.spawnCamp = () => {
        var camp;
        for (var i = 0; i < spawner.MAX_CAMP_COUNT; i++) {
            camp = spawner.campPool[i];
            if (!camp.alive) {   //  Current camp instance has been deactivated
                camp.reset(64 + (camp.width / 2) + camp.CAMPER_RADIUS, game.GROUND_Y); // TODO: add camper sprite width as well
                camp.onReset();
                return camp;
            }
        }
        // console.error('spawner.js:spawnCamp():Not enough camp instances!')
        return camp;
    }

    spawner.spawnTree = () => {
        var tree;
        for (var i = 0; i < spawner.MAX_TREE_COUNT; i++) {
            tree = spawner.treePool[i];
            if (!tree.alive) {   //  Current tree instance has been deactivated
                tree.reset(64 + (tree.width / 2), game.GROUND_Y);
                tree.onReset();
                return tree;
            }
        }
        // console.error('spawner.js:spawnTree():Not enough tree instances!')
        return tree;
    }

    spawner.spawnWolf = () => {
        var wolf;
        for (var i = 0; i < spawner.MAX_WOLF_COUNT; i++) {
            wolf = spawner.wolfPool[i];
            if (!wolf.alive) {
                wolf.reset(0 - (wolf.width / 2), game.GROUND_Y);
                return wolf;
            }
        }
        // console.error('spawner.js:spawnWolf():Not enough wolf instances!')
        return wolf;
    }

    spawner.spawnSpears = () => {
        var spears;
        for (var i = 0; i < spawner.MAX_SPEARS_COUNT; i++) {
            spears = spawner.spearsPool[i];
            if (!spears.alive) {
                spears.reset(64 + (spears.width / 2), game.GROUND_Y);
                return spears;
            }
        }
        // console.error('spawner.js:spawnSpears():Not enough spears instances!')
        return spears;
    }

    spawner.spawn = () => {

        //  Spawn a camp a quarter of the time
        var rnd = game.rnd.integerInRange(0, 2);
        switch(rnd) {
            case 0:
                spawner.spawnCamp();
                break;
            case 1:
                spawner.spawnWolf();
                break;
            case 2:
                spawner.spawnSpears();
                break;
            default:
        }

        //  Reset timer
        spawner.spawnTimer = setTimeout(spawner.spawn, spawner.SPAWN_RATE);

        
    }

    /*
        createFunc: constructor function to use when instantiating the instances
            => should accept 3 parameters: x, y, and game
        count: the size of the pool
        group: [optional] the group to add the instances to
    */
    spawner.createPool = (createFunc, count, group) => {
        var pool = [];
        var instance;
        for (var i = 0; i < count; i++) {
            instance = createFunc(-1000, -1000, game);
            instance.checkWorldBounds = true;
            instance.outOfBoundsKill = true;
            instance.kill();
            pool.push(instance);

            if (group) {
                group.addChild(instance);
            }
        }
        return pool;
    }

    spawner.stopSpawning = () => {
        for (var i = 0; i < spawner.timers.length; i++) {
            clearTimeout(spawner.timers[i]);
            spawner.timers[i] = null;
        }
        
    }

    spawner.create();
    return spawner;

};

module.exports = createSpawner