/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = {

    /*
        from underscore; returns a function that limits how often a function can be called
        func: the function to be executed
        wait: minimum time in ms to wait between executing func
        immediate: whether the function should be triggered on the leading edge of the wait time, or the trailing edge
    */
    debounce: function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;

            // called after [wait] ms from the last call to debounce()
            var later = function later() {
                timeout = null; // start new period
                if (!immediate) {
                    // func should be called on trailing edge, which is now
                    func.apply(context, args);
                }
            };

            var callNow = immediate && !timeout; // should be called on leading edge & hasn't already been called this period
            clearTimeout(timeout); // reset period
            timeout = setTimeout(later, wait); // call later() after [wait] ms
            if (callNow) {
                func.apply(context, args);
            }
        };
    },

    clamp: function clamp(min, num, max) {
        if (num < min) {
            return min;
        } else if (num > max) {
            return max;
        } else {
            return num;
        }
    }
};

module.exports = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resize = function resize() {
    document.body.style.zoom = window.innerHeight / game.height;
};

var mainState = {
    preload: function preload() {
        this.game.renderer.renderSession.roundPixels = true; // disallow fractional pixel movement
        this.game.stage.smoothed = false;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas); // disables anti-aliasing
        var utils = __webpack_require__(0);
        resize();
        window.onresize = utils.debounce(resize, 100);

        // Prevent game from pausing when it loses focus
        game.stage.disableVisibilityChange = true;
    },

    create: function create() {
        game.stage.backgroundColor = '#0076a3';

        game.state.add('loading', __webpack_require__(2)(game));
        game.state.start('loading');
    }
};

var game = new Phaser.Game(64, 64, Phaser.AUTO, 'gameDiv', {
    preload: mainState.preload,
    create: mainState.create
});

game.state.add('mainState', mainState);
game.state.start('mainState');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Loading = function Loading(game) {
    var loading = {
        preload: function preload() {
            // Load sprites here
            //  dragon
            game.load.spritesheet('dragon', 'assets/img/dragon.png', 12, 12);
            //  environment
            game.load.image('ground', 'assets/img/ground.png');
            game.load.image('sky', 'assets/img/sky.png');
            game.load.image('tree', 'assets/img/tree.png');
            //  spawnables
            game.load.spritesheet('camp', 'assets/img/camp.png', 8, 12);
            game.load.spritesheet('camper', 'assets/img/camper.png', 8, 12);
            game.load.image('nest', 'assets/img/nest.png');
            game.load.image('nest-empty', 'assets/img/nest-empty.png');
            game.load.spritesheet('bird', 'assets/img/bird.png', 8, 8);
            game.load.image('wolf', 'assets/img/wolf.png');
            game.load.image('spears', 'assets/img/spears.png');
            game.load.image('spears-small', 'assets/img/spears-small.png');
            //  ui
            game.load.bitmapFont('pixeled', 'assets/fonts/pixeled.png', 'assets/fonts/pixeled.fnt');
            game.load.image('main-menu', 'assets/img/main-menu.png');
            game.load.image('game-over', 'assets/img/game-over.png');
            game.load.spritesheet('start-button', 'assets/img/start-button.png', 40, 20);
            //  audio
            game.load.audio('bgm', ['assets/audio/wyrmling.wav', 'assets/audio/wyrmling.mp3', 'assets/audio/wyrmling..ogg']);
        },

        create: function create() {
            game.state.add('mainMenu', __webpack_require__(3)(game));
            game.state.start('mainMenu');
        }
    };

    return loading;
};

module.exports = Loading;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MainMenu = function MainMenu(game) {
    var mainMenu = {
        create: function create() {
            var mainMenuBG = game.add.sprite(0, 0, 'main-menu');
            var music = game.add.audio('bgm');
            music.loopFull(1);

            window.addEventListener('click', function (event) {
                game.state.add('play', __webpack_require__(4)(game));
                game.state.start('play');
            });
        }
    };
    return mainMenu;
};
module.exports = MainMenu;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Play = function Play(game) {
            var play = {
                        create: function create() {
                                    var _this = this;

                                    //  Enable Arcade Physics System
                                    game.physics.startSystem(Phaser.Physics.ARCADE);

                                    game.time.advancedTiming = true; //  Required for accessing time.fps

                                    game.GROUND_Y = game.world.height - 12;
                                    game.worldSpeed = 5;

                                    game.objectData = __webpack_require__(5);
                                    game.utils = __webpack_require__(0);

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
                                    var createSpawner = __webpack_require__(6);
                                    this.spawner = createSpawner(game);

                                    //  Dragon
                                    var createDragon = __webpack_require__(14);
                                    game.dragon = createDragon(game);
                                    game.dragon.bringToTop();

                                    //  Score
                                    game.score = 0;
                                    game.scoreText = game.add.bitmapText(1, game.GROUND_Y + 3, 'pixeled', 'score: 0', 5);

                                    game.addScore = function (points) {
                                                game.score += points;
                                                game.scoreText.text = 'score: ' + game.score;
                                                game.dragon.checkForLevelUp();
                                    };

                                    game.gameOver = function () {
                                                _this.spawner.stopSpawning();
                                                _this.spawner.destroy();
                                                game.state.add('game-over', __webpack_require__(15)(game));
                                                game.state.start('game-over');
                                    };
                        },

                        update: function update() {

                                    //  Check for trigger-type collisions
                                    game.physics.arcade.overlap(game.dragon, game.triggerables, function (dragon, triggerable) {
                                                triggerable.trigger(dragon);
                                    });

                                    //  Move ground
                                    this.ground.tilePosition.x -= game.worldSpeed / 60;
                        },

                        render: function render() {
                                    //  Print FPS
                                    // game.debug.text(game.dragon.body.velocity.y || '--', 52, game.world.height, "#00ff00", "10px Courier");
                                    // game.debug.body(game.dragon);
                        }
            };

            return play;
};

module.exports = Play;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objects = {
    dragon: {
        moveSpeed: 25,
        level1MoveSpeed: 50,
        jumpVelocity: -100,
        level1JumpVelocity: -125
    },
    nest: {
        xp: 10
    },
    bird: {
        xp: 50
    },
    camper: {
        xp: 25
    }
};

module.exports = objects;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createSpawner = function createSpawner(game) {
    var spawner = game.add.sprite(0, 0);
    spawner.SPAWN_RATE = 8000; //  ms between object spawns
    spawner.MAX_CAMP_COUNT = 10; //  Largest number of camp objects that can be on screen at any given time
    spawner.MAX_TREE_COUNT = 10; //  Largest number of tree objects that can be on screen at any given time
    spawner.MAX_WOLF_COUNT = 10; //  Largest number of wolf objects that can be on screen at any given time
    spawner.MAX_SPEARS_COUNT = 10; //  Largest number of spears objects that can be on screen at any given time
    spawner.TREE_SPAWN_RATE_MIN = 3000; //  Range of ms between tree spawns
    spawner.TREE_SPAWN_RATE_MAX = 5000;

    //  Start spawn timers
    spawner.timers = [];
    var enemyTimer = setTimeout(function () {
        spawner.spawn();
    }, 1000);
    spawner.timers.push(enemyTimer);

    var treeTimer = setTimeout(function () {
        spawner.onTreeTimeout();
    }, 1000);
    spawner.timers.push(treeTimer);

    spawner.create = function () {
        spawner.trees = game.add.group(game.spawnables);
        spawner.camps = game.add.group(game.spawnables);
        spawner.wolves = game.add.group(game.spawnables);
        spawner.spears = game.add.group(game.spawnables);

        // Create camp object pool and deactivate camps
        var createCamp = __webpack_require__(7);
        spawner.campPool = spawner.createPool(createCamp, spawner.MAX_CAMP_COUNT, spawner.camps);

        // Create tree object pool and deactivate trees
        var createTree = __webpack_require__(9);
        spawner.treePool = spawner.createPool(createTree, spawner.MAX_TREE_COUNT, spawner.trees);

        // Create wolf object pool and deactivate wolves
        var createWolves = __webpack_require__(12);
        spawner.wolfPool = spawner.createPool(createWolves, spawner.MAX_WOLF_COUNT, spawner.wolf);

        // Create spears object pool and deactivate spears
        var createSpears = __webpack_require__(13);
        spawner.spearsPool = spawner.createPool(createSpears, spawner.MAX_SPEARS_COUNT, spawner.spears);
    };

    spawner.onTreeTimeout = function () {
        spawner.spawnTree();
        var treeTimerLength = game.rnd.between(spawner.TREE_SPAWN_RATE_MIN, spawner.TREE_SPAWN_RATE_MAX);
        spawner.timers[1] = setTimeout(spawner.onTreeTimeout, treeTimerLength);
    };

    spawner.spawnCamp = function () {
        var camp;
        for (var i = 0; i < spawner.MAX_CAMP_COUNT; i++) {
            camp = spawner.campPool[i];
            if (!camp.alive) {
                //  Current camp instance has been deactivated
                camp.reset(64 + camp.width / 2 + camp.CAMPER_RADIUS, game.GROUND_Y); // TODO: add camper sprite width as well
                camp.onReset();
                return camp;
            }
        }
        // console.error('spawner.js:spawnCamp():Not enough camp instances!')
        return camp;
    };

    spawner.spawnTree = function () {
        var tree;
        for (var i = 0; i < spawner.MAX_TREE_COUNT; i++) {
            tree = spawner.treePool[i];
            if (!tree.alive) {
                //  Current tree instance has been deactivated
                tree.reset(64 + tree.width / 2, game.GROUND_Y);
                tree.onReset();
                return tree;
            }
        }
        // console.error('spawner.js:spawnTree():Not enough tree instances!')
        return tree;
    };

    spawner.spawnWolf = function () {
        var wolf;
        for (var i = 0; i < spawner.MAX_WOLF_COUNT; i++) {
            wolf = spawner.wolfPool[i];
            if (!wolf.alive) {
                wolf.reset(0 - wolf.width / 2, game.GROUND_Y);
                return wolf;
            }
        }
        // console.error('spawner.js:spawnWolf():Not enough wolf instances!')
        return wolf;
    };

    spawner.spawnSpears = function () {
        var spears;
        for (var i = 0; i < spawner.MAX_SPEARS_COUNT; i++) {
            spears = spawner.spearsPool[i];
            if (!spears.alive) {
                spears.reset(64 + spears.width / 2, game.GROUND_Y);
                return spears;
            }
        }
        // console.error('spawner.js:spawnSpears():Not enough spears instances!')
        return spears;
    };

    spawner.spawn = function () {

        //  Spawn a camp a quarter of the time
        var rnd = game.rnd.integerInRange(0, 2);
        switch (rnd) {
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
    };

    /*
        createFunc: constructor function to use when instantiating the instances
            => should accept 3 parameters: x, y, and game
        count: the size of the pool
        group: [optional] the group to add the instances to
    */
    spawner.createPool = function (createFunc, count, group) {
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
    };

    spawner.stopSpawning = function () {
        for (var i = 0; i < spawner.timers.length; i++) {
            clearTimeout(spawner.timers[i]);
            spawner.timers[i] = null;
        }
    };

    spawner.create();
    return spawner;
};

module.exports = createSpawner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createCamp = function createCamp(x, y, game) {
    var camp = game.add.sprite(x, y, 'camp');
    camp.anchor.setTo(0.5, 1); //  Set anchor to bottom middle
    game.physics.arcade.enable(camp);
    camp.MAX_CAMPER_COUNT = 3; //  Maximum number of campers that can be spawned each reset
    camp.CAMPER_RADIUS = 5; //  How far from camp can campers be spawned, horizontally

    //  Re-enable pool functionality upon re-entering the screen
    camp.events.onEnterBounds.add(function () {
        camp.outOfBoundsKill = true;
    });

    camp.create = function () {
        var camper;
        var createCamper = __webpack_require__(8);
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
    };

    camp.update = function () {
        camp.body.velocity.x = -game.worldSpeed;
    };

    camp.onReset = function () {
        var camperCount = game.rnd.integerInRange(1, 3);
        var camper;
        for (var i = 0; i < camperCount; i++) {
            var x = camp.x + game.rnd.integerInRange(-5, 5); //  Spawn somewhere around campfire
            //TODO: flip sprite if to the right of the campfire
            var y = camp.y;
            camper = camp.camperPool[i];
            camper.reset(x, y);
            camper.onReset();
        }
        //  Don't kill immediately when spawned out of bounds
        camp.outOfBoundsKill = false;
    };

    camp.create();
    return camp;
};

module.exports = createCamp;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createCamper = function createCamper(x, y, game) {
    var camper = game.add.sprite(x, y, 'camper');
    game.triggerables.push(camper);
    camper.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(camper);
    camper.MAX_RUN_SPEED = 10;
    camper.SIGHT_RADIUS = 20; //  How far from the dragon the camper will be before it starts to run
    camper.events.onEnterBounds.add(function () {
        camper.outOfBoundsKill = true;
    });

    camper.animations.add('sit', [0]);
    camper.animations.add('run', [8, 9, 10, 11, 12, 13, 14, 15]);

    camper.onReset = function () {
        camper.isRunning = false;
        camper.runSpeed = 0;
        camper.outOfBoundsKill = false;
        camper.animations.play('sit', 20, false);
        camper.animations.stop();
        camper.frame = 0;
    };

    camper.update = function () {
        //  Check if camper should start running
        if (!camper.isRunning && game.physics.arcade.distanceBetween(camper, game.dragon) < camper.SIGHT_RADIUS && !game.dragon.isDucking) {
            camper.isRunning = true;
            camper.animations.play('run', 15, true);
        }

        if (camper.isRunning && camper.runSpeed < camper.MAX_RUN_SPEED) {
            camper.runSpeed += 1;
        }
        camper.body.velocity.x = -game.worldSpeed + camper.runSpeed;
    };

    camper.trigger = function (dragon) {
        if (dragon.isDescending()) {
            //  Eat camper
            camper.kill();
            game.addScore(game.objectData.camper.xp);
        }
    };

    camper.onReset();
    return camper;
};

module.exports = createCamper;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createTree = function createTree(x, y, game) {
    var tree = game.add.sprite(x, y, 'tree');
    tree.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(tree);

    tree.NEST_PROBABILITY = 1 / 3; //  Likelihood that the tree will have a nest in it
    tree.NEST_X = -3; //  Relative position of nest to tree
    tree.NEST_Y = -16;
    tree.nest = null; //  Current nest object

    tree.createNest = __webpack_require__(10);

    tree.update = function () {
        tree.body.velocity.x = -game.worldSpeed;
    };

    tree.onReset = function () {
        var rnd = game.rnd.frac();
        if (rnd < tree.NEST_PROBABILITY) {
            //  Spawn nest
            tree.nest = tree.createNest(tree.x + tree.NEST_X, tree.y + tree.NEST_Y, game);
            game.spawnables.addChild(tree.nest);
        }
    };

    // Delete nest object when tree is deactivated
    tree.events.onKilled.add(function () {
        if (tree.nest != null) {
            tree.nest.destroy();
        }
    });

    return tree;
};

module.exports = createTree;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createNest = function createNest(x, y, game) {
    var nest = game.add.sprite(x, y, 'nest');
    game.triggerables.push(nest);
    nest.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(nest);

    nest.MAX_BIRD_COUNT = 2;
    nest.MAX_BIRD_DISTANCE = 1; //  How far away from the nest center birds can spawn
    nest.hasEggs = true;

    nest.create = function () {
        var createBird = __webpack_require__(11);
        var rnd = game.rnd.between(0, nest.MAX_BIRD_COUNT);
        for (var i = 0; i < rnd; i++) {
            var rndOffset = game.rnd.between(-nest.MAX_BIRD_DISTANCE, nest.MAX_BIRD_DISTANCE);
            //  Spawn bird
            createBird(nest.x + rndOffset, nest.y + rndOffset, game);
        }
    };

    nest.update = function () {
        nest.body.velocity.x = -game.worldSpeed;
    };

    nest.trigger = function () {
        if (nest.hasEggs) {
            nest.hasEggs = false;
            nest.loadTexture('nest-empty');
            game.addScore(game.objectData.nest.xp);
        }
    };

    nest.create();
    return nest;
};

module.exports = createNest;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createBird = function createBird(x, y, game) {
    var bird = game.add.sprite(x, y, 'bird');
    game.physics.arcade.enable(bird);
    game.triggerables.push(bird);

    bird.SIGHT_RADIUS = 25;
    bird.MAX_FLY_SPEED = 15;

    bird.isFlying = false;
    bird.flySpeedX = 0;
    bird.flySpeedY = 0;

    //  Enable despawning upon entering the screen
    bird.events.onEnterBounds.add(function () {
        bird.outOfBoundsKill = true;
    });

    bird.update = function () {
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
    };

    bird.trigger = function (dragon) {
        bird.kill();
        game.addScore(game.objectData.bird.xp);
    };
    return bird;
};

module.exports = createBird;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createWolf = function createWolf(x, y, game) {
    var wolf = game.add.sprite(x, y, 'wolf');
    game.triggerables.push(wolf);
    wolf.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(wolf);

    wolf.START_MOVE_SPEED = 6;
    wolf.MAX_MOVE_SPEED = 30;
    wolf.MIN_MOVE_SPEED = -5;
    wolf.moveSpeed = wolf.START_MOVE_SPEED;
    wolf.isLookingForDragon = false;

    wolf.update = function () {
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
    };

    wolf.trigger = function (dragon) {
        game.gameOver();
    };

    return wolf;
};

module.exports = createWolf;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createSpears = function createSpears(x, y, game) {
    var spears = game.add.sprite(x, y, 'spears-small');
    game.triggerables.push(spears);
    spears.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(spears);

    spears.body.setSize(6, 6, -3, -1);

    spears.update = function () {
        spears.body.velocity.x = -game.worldSpeed;
    };

    spears.trigger = function (dragon) {
        game.gameOver();
    };

    return spears;
};

module.exports = createSpears;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var level1 = function level1(game) {
    game.dragon.moveSpeed = game.objectData.dragon.level1MoveSpeed;
    game.dragon.jumpVelocity = game.objectData.dragon.level1JumpVelocity;
};

var createDragon = function createDragon(game) {
    var dragon = game.add.sprite(32, game.GROUND_Y, 'dragon');
    dragon.anchor.setTo(0.5, 1); // set anchor to bottom middle
    game.physics.arcade.enable(dragon);
    dragon.body.collideWorldBounds = true;
    dragon.body.setSize(6, 7, -1, 0);
    dragon.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7]);
    dragon.animations.add('duck', [8, 9, 10, 11, 12, 13, 14, 15]);
    dragon.animations.play('run', 8, true);

    dragon.body.gravity.y = 300;
    dragon.DUCKING_MODIFIER = 0.25; //  fraction of full speed the dragon can move while ducking
    dragon.LEVEL_SCORES = [200];
    dragon.LEVEL_FUNCTIONS = [level1];

    dragon.isDucking = false;
    dragon.level = 0;
    dragon.moveSpeed = game.objectData.dragon.moveSpeed; //  horizontal acceleration
    dragon.jumpVelocity = game.objectData.dragon.jumpVelocity; //  affects how high the dragon can jump


    dragon.isDescending = function () {
        return dragon.body.velocity.y > 0;
    };

    dragon.checkForLevelUp = function () {
        var lvl = dragon.level;
        if (lvl >= dragon.LEVEL_SCORES.length) {
            return;
        }
        if (game.score >= dragon.LEVEL_SCORES[lvl]) {
            dragon.LEVEL_FUNCTIONS[lvl](game);
            dragon.level++;
        }
    };

    dragon.update = function () {
        //  Collide dragon with platforms
        var hitPlatform = game.physics.arcade.collide(dragon, game.platforms);

        var cursors = game.input.keyboard.createCursorKeys();

        //  Jumping
        if (cursors.up.isDown && dragon.body.touching.down && hitPlatform) {
            dragon.body.velocity.y = dragon.jumpVelocity;
        }

        //  Ducking
        if (cursors.down.isDown && !cursors.up.isDown && dragon.body.touching.down && hitPlatform) {
            dragon.isDucking = true;
            dragon.animations.play('duck', 8, true);
        } else {
            dragon.isDucking = false;
            dragon.animations.play('run', 8, true);
        }

        // Movement
        dragon.body.velocity.x = 0;
        game.worldSpeed = 5; // TODO: replace w/ variable
        if (cursors.left.isDown) {
            //  Move Left
            dragon.body.velocity.x = -dragon.moveSpeed;
            game.worldSpeed -= 4 * dragon.DUCKING_MODIFIER;
        } else if (cursors.right.isDown) {
            // Move Right
            dragon.body.velocity.x = dragon.moveSpeed;
            game.worldSpeed += 4 * dragon.DUCKING_MODIFIER;
        } else {
            // TODO: stop animations
        }
        if (dragon.isDucking) {
            dragon.body.velocity.x *= dragon.DUCKING_MODIFIER;
        }
    };

    return dragon;
};

module.exports = createDragon;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameOver = function GameOver(game) {
    var gameOver = {
        create: function create() {
            var gameOverBg = game.add.sprite(0, 0, 'game-over');

            // window.addEventListener('click', (event) => {
            //     game.state.add('play', require('./play')(game));
            //     game.state.start('play');
            // })
        }
    };
    return gameOver;
};
module.exports = GameOver;

/***/ })
/******/ ]);