// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,
  properties: {
    thisCup: cc.Node,
    startPos: null,
    graphics: cc.Graphics,
    playText: cc.Node,
    lineGuide: cc.Node,
    dotDefault: cc.Node,
    character: cc.Node,
    transformCharacter: cc.Node,
  },

  start() {
    this.transformCharacter.opacity = 0;
    this.dotDefault._components._animationName = "Level01_idle";
    this.handleTouchMove();
  },

  handleTouchMove() {
    
    const _this = this;

    cc.Canvas.instance.node.on(
      cc.Node.EventType.TOUCH_START,
      (e) => {
       this.startPos = e.touch.getLocation();
      },
      this
    );

    //  event firee when user move on the screen
    cc.Canvas.instance.node.on(
      cc.Node.EventType.TOUCH_MOVE,
      (e) => {
        this.graphics.lineWidth = 10;
        this.graphics.strokeColor = cc.Color.WHITE;
        this.graphics.moveTo(this.startPos.x - cc.winSize.width/2, this.startPos.y - cc.winSize.height/2);
        this.graphics.lineTo(e.touch.getLocation().x - cc.winSize.width/2, e.touch.getLocation().y - cc.winSize.height/2);
        
        this.startPos = e.touch.getLocation();
        this.graphics.stroke();

        _this.lineGuide.opacity = 0;
        _this.playText.opacity = 0;
      },
      this
    );

      // event fire when user take off hand of the screen
    cc.Canvas.instance.node.on("mouseup", function (event) {
      const delayTime = cc.delayTime(1.4);
      const dotSkeleton = _this.dotDefault.getComponent("sp.Skeleton");
      const transformCharacterSkeleton = _this.transformCharacter.getComponent("sp.Skeleton");
      dotSkeleton.setAnimation(0, "Level01_play", false);
      _this.graphics.clear(true);

      const callFuncAction = cc.callFunc(function () {
        _this.character.opacity = 0;
        _this.transformCharacter.opacity = 255;
        transformCharacterSkeleton.setAnimation(0, "tranform", false);
      }, _this);

      const sequenceAction = cc.sequence(delayTime, callFuncAction);
      _this.node.runAction(sequenceAction);
  });
  },

});
