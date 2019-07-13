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

    properties: {},

    remove() {
        // var callbak = cc.callFunc(function() {
        //     Global.foundEye = true;
        //     this.node.active = false;
        // });
        // var action = cc.sequence(cc.fadeOut(1.5), callbak);
        // this.node.runAction(action);

        var ani = this.getComponent(cc.Animation);
        ani.stop('player-mask-shade');
        this.node.runAction(cc.fadeOut(1.5));
        // this.onDestroy.runAction(action);
    },
});