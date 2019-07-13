// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        img: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var a = this.getComponent(cc.Sprite);
        cc.loader.loadRes("ui&bg/forest", cc.SpriteFrame, function(err, spriteFrame) {
            // a.spriteFrame = spriteFrame;
            a.spriteFrame = spriteFrame;
        });

        // var action = cc.fadeOut(1);
        // this.node.runAction(action);

    },

    update(dt) {
        // this.getComponent(cc.Sprite).SpriteFrame = this.img;
    },
});