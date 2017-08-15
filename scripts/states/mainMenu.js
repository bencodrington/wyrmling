var MainMenu = (game) => {
    var mainMenu = {
        create: () => {
            var mainMenuBG = game.add.sprite(0, 0, 'main-menu');
            var music = game.add.audio('bgm');
            music.loopFull(1);

            window.addEventListener('click', (event) => {
                game.state.add('play', require('./play')(game));
                game.state.start('play');
            })
        }
    };
    return mainMenu;
};
module.exports = MainMenu;