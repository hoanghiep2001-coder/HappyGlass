cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    // handle move position from left to right
    this.handleMovePosition();

    // handle Scale after 0.6s
    this.scaleBlink();

    // handle onclick to fire next scene
    this.handleOnclick();
  },

  handleMovePosition() {
    // expected position: -75 / -60
    const _this = this.node;
    const position = cc.v2(-80, -60);
    const duration = 0.8;
    const moveAction = cc.moveTo(duration, position);
    _this.runAction(moveAction);
  },

  scaleBlink() {
    const _this = this.node;
    const delayAction = cc.delayTime(0.6);
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

      const parent = _this.parent;
      if(parent.name === "Level") {
        const Game = parent.getComponent("Game");
        Game.handleRecognizeCup(self.name);
      }

      switch (self.name) {
        case "BlueCup<toRightAnim>":
          cc.director.loadScene("BlueCharacter");
          break;
        case "Level01<toRightAnim>":
          cc.director.loadScene("BlueCharacterLv1");
          break;
        case "Level01-Red<toRightAnim>":
          cc.director.loadScene("RedCharacterLv1");
          break;
        default:
          console.log("Invalid Node")
          break;
      }
    });
  },

  // update (dt) {},
});
