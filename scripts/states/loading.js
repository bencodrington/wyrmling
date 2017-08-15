var Loading = function(game) {
    var loading = {
        preload: function() {
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
            game.load.bitmapFont('pixeled', 'assets/fonts/pixeled.png', 'assets/fonts/pixeled.fnt')
            game.load.image('main-menu', 'assets/img/main-menu.png');
            game.load.image('game-over', 'assets/img/game-over.png');
            game.load.spritesheet('start-button', 'assets/img/start-button.png', 40, 20);
            //  audio
            game.load.audio('bgm', ['assets/audio/wyrmling.wav', 'assets/audio/wyrmling.mp3', 'assets/audio/wyrmling..ogg']);
        },

        create: function() {
            game.state.add('mainMenu', require('./mainMenu')(game));
            game.state.start('mainMenu');
        }
    };

    return loading;
};

module.exports = Loading;