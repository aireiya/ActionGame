//myScene.js
var HowtoLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          audioEngine.playMusic(res.bgm_title, true);
        }


        var Howto_png = cc.Sprite.create(res.howtoplay_png);
        Howto_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(Howto_png);
        //add code
         //タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
      //bgmの再生をとめる
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
        //audioEngine.playEffect("res/se_select16.wav");
        // 次のシーンに切り替える
        cc.director.runScene(new stageScene());
    },
});

var HowtoScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowtoLayer();
        this.addChild(layer);
    }
});
