// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const Overlay = cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Node,
        star1: cc.Node,
        star2: cc.Node,
        star3: cc.Node,
        completeText: cc.Node,
        logo: cc.Node,
        button: cc.Node,
    },

    onLoad () {     
        this.hanldeMoveStar(-47, 95, this.star1, 0.8, 0.6);
        this.hanldeMoveStar(0, 100, this.star2, 0.8, 1.2);
        this.hanldeMoveStar(47, 95, this.star3, 0.8, 1.8);
    },

    hanldeMoveStar(x = 0, y = 0, object, duration = 0) {
        /** 
         * expected: {
         *  star1: x: -47, y: 95
         *  star2: x: 0, y: 100
         *  star3: x: 47, y: 95
         * }
         * */

        // set position for star
        const position = cc.v2(x, y);
        const moveAction = cc.moveTo(duration, position);
        object.runAction(moveAction);
    },
});
