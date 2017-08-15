var resize = function resize() {
    document.body.style.zoom = window.innerHeight / game.height;
};

var mainState = {
    preload: function() {
        this.game.renderer.renderSession.roundPixels = true;    // disallow fractional pixel movement
        this.game.stage.smoothed = false;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas); // disables anti-aliasing
        var utils = require('./utils');
        resize();
        window.onresize = utils.debounce(resize, 100);

        // Prevent game from pausing when it loses focus
        game.stage.disableVisibilityChange = true;
    }, 

    create: function() {
        game.stage.backgroundColor = '#0076a3';

        game.state.add('loading', require('./states/loading')(game));
        game.state.start('loading');
    }
};

var game = new Phaser.Game(64, 64, Phaser.AUTO, 'gameDiv', {
    preload: mainState.preload,
    create: mainState.create
});

game.state.add('mainState', mainState);
game.state.start('mainState');