

var knightLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var knight = new Knight();
      this.addChild(knight);
      //cc.eventManager.addListener(listener, this);

   }

});
var Knight = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.velocity = cc.p(0, 0);
    this.FrameCount = 0;

    for (i = 0; i < 7; i++) {　　　　　　
      for (j = 0; j < 10; j++) {
        switch (level[i][j]) {
          //Knight
          case 5:
          var KnightSprite = cc.Sprite.create(res.Knight_frame);

          KnightSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(KnightSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.Knight_frame);
          for (k = 0; k < 3; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(1 +(96 * k), 0, 96, 96));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          KnightSprite.runAction(action);
          KnightSprite.scheduleUpdate();
          break;

          //Slyme
          case 6:
          var KnightSprite = cc.Sprite.create(res.Slyme_frame);

          KnightSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(KnightSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.Slyme_frame);
          for (k = 0; k < 3; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(1 +(150 * k), 0, 150, 96));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.3);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          KnightSprite.runAction(action);
          KnightSprite.scheduleUpdate();
          break;

          //Wolf
          case 7:
          var KnightSprite = cc.Sprite.create(res.Wolf_frame);

          KnightSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(KnightSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.Wolf_frame);
          for (k = 0; k < 3; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(1 +(127 * k), 0, 127, 96));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.1);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          KnightSprite.runAction(action);
          KnightSprite.scheduleUpdate();
          break;

          //Pegasus
          case 8:
          var KnightSprite = cc.Sprite.create(res.Pegasus_frame);

          KnightSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(KnightSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.Pegasus_frame);
          for (k = 0; k < 3; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(1 +(142 * k), 0, 142, 96));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.2);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          KnightSprite.runAction(action);
          KnightSprite.scheduleUpdate();
          break;
        }
      }
    }
  }
});
