// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let clickedObject = null;
let initCharacter = null;
let initLevel = null;
const Game = cc.Class({
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
    overlay: cc.Node,
  },

  onLoad() {
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
        _this.graphics.lineWidth = 10;
        _this.graphics.strokeColor = cc.Color.WHITE;
        _this.graphics.moveTo(
          _this.startPos.x - cc.winSize.width / 2,
          _this.startPos.y - cc.winSize.height / 2
        );
        _this.graphics.lineTo(
          e.touch.getLocation().x - cc.winSize.width / 2,
          e.touch.getLocation().y - cc.winSize.height / 2
        );
        _this.startPos = e.touch.getLocation();
        _this.graphics.stroke();

          console.log(_this.startPos)

        _this.lineGuide.opacity = 0;
        _this.playText.opacity = 0;
      },
      _this
    );

    // event fire when user take off hand of the screen
    cc.Canvas.instance.node.on("mouseup", function (event) {
      // play water drop music
      const canvas = cc.find("Canvas");
      const AudioManager = canvas.getComponent("AudioManager");
      AudioManager.playwaterDropMusicMusic();

      // all Res is okay. Now run game
      _this.setupLevel(initCharacter, initLevel, true);
    });
  },

  setupLevel(character = "", level = 0, onPlay = false) {
    initCharacter = character;
    initLevel = level;

    const runGame = (
      animName,
      character_defaultAnim,
      character_transformedAnim,
    ) => {
      // set water drop anim
      const dotSkeleton = this.dotDefault.getComponent("sp.Skeleton");
      dotSkeleton.setAnimation(0, animName, false);

      // delete the graphics stroke
      this.graphics.clear(true);

      // make a sequenceAction after 1.4s
      const handleArgs = () => {
        this.character.opacity = 0;
        this.thisCup.opacity = 0;
        this.transformCharacter.opacity = 255;
      };
      this.makeSequenceAction(
        this,
        this.transformCharacter,
        1.4,
        character_defaultAnim,
        false,
        handleArgs
      );

      // make infinite anim for transformed character
      this.makeSequenceAction(
        this,
        this.transformCharacter,
        3,
        character_transformedAnim,
        true,
        null
      );

      // open overlay when character transformed
      const handleOpenOverlay = () => {
        this.overlay.active = true;
      };
      this.makeSequenceAction(this, null, 3, null, false, handleOpenOverlay);
    };

    if (character === "Blue" && level === 1 && onPlay === true) {
      runGame("Level01_play", "tranform", "cell_flex");
    } else if (character === "Blue" && level === 2 && onPlay === true) {
      runGame("Level02_play", "tranform", "cell_flex");
    } else if (character === "Red" && level === 1 && onPlay === true) {
      runGame("Level01_play", "tranform", "cell_flex");
    } else if (character === "Red" && level === 2 && onPlay === true) {
      runGame("Level02_play", "tranform", "cell_flex");
    }
  },

  handleRecognizeCup(cupName) {
    clickedObject = cupName;
    console.log(cupName);
    switch (clickedObject) {
      case "Level01<toRightAnim>":
        this.setupLevel("Blue", 1);
        break;
      case "Level02<toLeftAnim>":
        this.setupLevel("Blue", 2);
        break;
      case "Level01-Red<toRightAnim>":
        this.setupLevel("Red", 1);
        break;
      case "Level02-Red<toLeftAnim>":
        this.setupLevel("Red", 2);
        break;
      default:
        break;
    }
  },

  makeSequenceAction(
    ccNode,
    character,
    delay = 0,
    animType = "",
    loop = false,
    callback = function () {}
  ) {
    const delayTime = cc.delayTime(delay);
    let prefab;
    if (character) {
      prefab = character.getComponent("sp.Skeleton");
    }
    const callFuncAction = cc.callFunc(function () {
      if (callback) {
        callback();
      }
      if (character) {
        prefab.setAnimation(0, animType, loop);
      }
    }, ccNode);

    const sequenceAction = cc.sequence(delayTime, callFuncAction);
    ccNode.node.runAction(sequenceAction);
  },
});
