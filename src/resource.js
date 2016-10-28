var res = {
    title_png :"res/title.png",
    howtoplay_png:"res/HowToPlay.png",

    ground_png: "res/ground_96x96.png",
    block_png: "res/renga.png",

    Knight_frame:"res/knight.png",
    Slyme_frame:"res/slyme.png",
    Wolf_frame:"res/wolf.png",
    Pegasus_frame:"res/Pegasus.png",


    stageselect_png:"res/stageselect.png",
    background_png:"res/glass.jpg",

    uprock_png:"res/rock_above.png",
    underrock_png:"res/rock_under.png",
    up_png:"res/ceiling.png",
    under_png:"res/land.png",

    player_frames:"res/player_frames2.png",

    particle_texture:"res/particle_texture.png",//パーティクル
    particle_plist:"res/particle_texture.plist",//パーティクル
    Title_png:"res/Title.png",
    start_png:"res/start.png",
    gameoverBG_png:"res/gameover.png",
    replay_png:"res/replay_button.png",
    Heart_png:"res/heart.png",


    //こっから音楽
    bgm_title:"res/sound/wave.mp3",
    bgm_main:"res/sound/初陣.m4a",
    bgm_main2:"res/sound/己が信念を杖に.mp3",
    se_swim:"res/sound/swim.mp3",
    se_get:"res/sound/se_get.mp3",
    se_miss:"res/sound/se_surprise.mp3",
    se_death:"res/sound/Death.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
