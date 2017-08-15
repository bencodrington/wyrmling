var GameOver = (game) => {
    var gameOver = {
        create: () => {
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