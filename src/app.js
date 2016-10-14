//app.js
var size;

var mylabel;
//背景スクロールで追加した部分
var gameLayer;
var xSpeed = 0;
var onGround = true;
var leftmove = false;
var rightmove = false;
var background;
var scrollSpeed = 1;
var score = 0;
var HP = 5;
//プレイヤーで追加した部分　重力
var ship;
var i =0;
var gameGravity = -0.1;
//プレイヤーを操作するで追加した部分 エンジンの推進力
var gameThrust = 5;
//パーティクル
var emitter;
var audioEngine;


var gameScene = cc.Scene.extend({

  onEnter: function() {
    this._super();

    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);

    //音楽再生エンジン
    audioEngine = cc.audioEngine;
  },
});


var game = cc.Layer.extend({
  init: function() {
    this._super();
    size = cc.director.getWinSize();
    //BGMと効果音のエンジンを追加

    cc.eventManager.addListener({
    event: cc.EventListener.KEYBOARD,
    onKeyPressed: function (keyCode, event) {
      rightmove = false;
      leftmove = false;
      if(keyCode == 38 && onGround == true){//↑
        ship.engineOn = true;
        onGround = false;
        //泳ぐ時のSE
        //audioEngine.playEffect(res.se_swim);
        setTimeout(function(){
         ship.engineOn = false;
       },200);
      }
      if(keyCode == 39){
        rightmove = true;
      }
      if(keyCode == 37){
        leftmove = true;
      }
    },
    onKeyReleased: function(keyCode, event){
      rightmove = false;
      leftmove = false;
    }
  },this);

    //スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed
    background = new ScrollingBG();
    this.addChild(background);

    bgunder = new ScrollingUNDER();
    this.addChild(bgunder);

    ship = new Ship();
    this.addChild(ship);

    scoreText = cc.LabelTTF.create("Score:" +score ,"Stencil Std","20",cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(scoreText);
    scoreText.setPosition(250,300);

    //scheduleUpdate関数は、描画の都度、update関数を呼び出す
    this.scheduleUpdate();
    //ここからパーティクルの設定
    emitter = cc.ParticleSun.create();
    this.addChild(emitter, 1);
    var myTexture = cc.textureCache.addImage(res.particle_texture);
    emitter.setTexture(myTexture);
    emitter.setStartSize(2);
    emitter.setEndSize(4);

  },
  update: function(dt) {
    //backgroundのscrollメソッドを呼び出す
    background.scroll();
    ship.updateY();
    if(rightmove == true){
      console.log("右");
      ship.setFlippedX(false);
      xSpeed = 5;
      //ship.setPosition(ship.getPosition().x + xSpeed, ship.getPosition().y);
      bgunder.setPosition(bgunder.getPosition().x - xSpeed, bgunder.getPosition().y);
      background.setPosition(background.getPosition().x - xSpeed, background.getPosition().y);
    }
    if(leftmove == true){
      console.log("左");
      ship.setFlippedX(true);
      xSpeed = -5;
      //ship.setPosition(ship.getPosition().x + xSpeed, ship.getPosition().y);
      bgunder.setPosition(bgunder.getPosition().x - xSpeed, bgunder.getPosition().y);
      background.setPosition(background.getPosition().x - xSpeed, background.getPosition().y);
    }
  },

});
//---------------こっから背景やぞ------------------
//スクロール移動する背景クラス
var ScrollingBG = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.background_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, size.height/2);
    //this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    //this.setPosition(this.getPosition().x - scrollSpeed, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 320, this.getPosition().y);
    }
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 320, this.getPosition().y);
    }
  }
});

//背景クラス(下の床)
var ScrollingUNDER = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.under_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, 0);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x - scrollSpeed * 2, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 320, this.getPosition().y);
    }
  }
});





//重力（仮）で落下する　プレイヤー　
var Ship = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.shrimp01_png);
    this.ySpeed = 0; //プレイヤーの垂直速度
    //プレイヤーを操作するで追加した部分
    this.engineOn = false; //カスタム属性追加　プレイヤーのエンジンのON OFF
    this.invulnerability = 0; //無敵モード時間　初期値0
  },
  onEnter: function() {
    this.setPosition(60, 160);
  },
  updateY: function() {
    //プレイヤーを操作するで追加した部分
    if (this.engineOn) {
      this.ySpeed = gameThrust;
    }
    if(onGround == false){
      //ここでパーティクルエフェクトをプレイヤーのすぐ後ろに配置している
      emitter.setPosition(this.getPosition().x - 25, this.getPosition().y);
      //バタバタアニメーション
      i+=1;
      if(i==2){this.initWithFile(res.shrimp02_png);}
      if(i==3){this.initWithFile(res.shrimp03_png);}
      if(i==4){this.initWithFile(res.shrimp04_png);}
      if(i==5){i=1}
    }else {
      //エンジンOffのときは画面外に配置
      //this.initWithFile(res.shrimp01_png);
      emitter.setPosition(this.getPosition().x - 250, this.getPosition().y);
    }

    //無敵モード中の視覚効果
    if (this.invulnerability > 0) {
      this.invulnerability--;
      this.setOpacity(255 - this.getOpacity());
    }


    this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
    this.ySpeed += gameGravity;

    if (this.getPosition().y < 30 || this.getPosition().y > 320) {
        onGround = true;
        this.ySpeed = 0;
    }


    //プレイヤーが画面外にでたら、リスタートさせる
    if (this.getPosition().y < 0 || this.getPosition().y > 320) {

      restartGame();
    }
  }
});

//プレイヤーを元の位置に戻して、プレイヤーの変数を初期化する
function restartGame() {
  audioEngine.playEffect(res.se_miss);

  HP --;

  if(HP < 0){

    HP = 5;
    //BGM終わり
      audioEngine.stopMusic();
      audioEngine.stopAllEffects();

    //GameOverSceneへGO
    cc.director.runScene(new GameOverScene());
  }
  ship.ySpeed = 0;
  ship.setPosition(ship.getPosition().x, 160);
  ship.invulnerability = 100;


}
