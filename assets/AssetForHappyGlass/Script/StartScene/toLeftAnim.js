// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    // handle move position from right to left
    this.handleMovePosition();

    // handle Scale after 1.2s
    this.scaleBlink();

    // handle on click
    this.handleOnclick();
  },

  handleMovePosition() {
    // expected position: 75 / -60
    const _this = this.node;
    const position = cc.v2(80, -60);
    const duration = 0.8;
    const moveAction = cc.moveTo(duration, position);
    _this.runAction(moveAction);
  },

  scaleBlink() {
    const _this = this.node;
    const delayAction = cc.delayTime(1.2);
    const duration = 0.6;
    const callFuncAction = cc.callFunc(function () {
      let scaleUp;
      let scaleDown;

      scaleUp = cc.scaleTo(duration, 0.45);
      scaleDown = cc.scaleTo(duration, 0.4);

      let blink = cc.sequence(scaleUp, scaleDown);
      _this.runAction(blink);
    }, this);

    const sequenceAction = cc.sequence(delayAction, callFuncAction);
    _this.runAction(sequenceAction);
  },
  handleOnclick() {
    const _this = this.node;
    const self = this;
    const canvas = cc.find("Canvas");
    const AudioManager = canvas.getComponent("AudioManager");

    // load scene when choose character
    _this.on("touchend", () => {
      AudioManager.playclickMusicMusic();
      if (self.name === "RedCup<toLeftAnim>") {
        cc.director.loadScene("RedCharacter");
      } else {
        cc.director.loadScene("RedCharacterLv2");
      }
    });
  },

  // update (dt) {},
});
