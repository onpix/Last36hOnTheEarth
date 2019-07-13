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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    react(caption) {
        if (Global.holdedItem != '长杆') {
            cc.loader.loadRes('itemtext/导航仪', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        } else {
            Global.getGuider = true;
            // var remove = cc.callFunc(function() {
            //     cc.find('Canvas/bg_up/bag').getComponent('bag').remove('长杆');
            // }, this);
            // var get = cc.callFunc(function() {
            //     this.getComponent('canGetBgItem').getByUsr('get导航仪');
            // }, this);
            // var action = cc.sequence(remove, get);
            // this.node.runAction(action);

            this.getComponent('canGetBgItem').getByUsr();
        }
    },
});