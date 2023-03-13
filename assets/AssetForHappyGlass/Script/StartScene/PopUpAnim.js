

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        // handle scale node with animation and pingpong
        this.ScaleNodeAnim();
    },

    ScaleNodeAnim () {
        const _this = this.node
        const duration = 0.8;
        const scaleUp = cc.scaleTo(duration, 0.35)
        const scaleDown = cc.scaleTo(duration, 0.3)
        const pingpongAction = cc.sequence(scaleUp, scaleDown);
        const loopInfiniteAction = cc.repeatForever(pingpongAction)

        _this.runAction(loopInfiniteAction)
    }

    // update (dt) {},
});
