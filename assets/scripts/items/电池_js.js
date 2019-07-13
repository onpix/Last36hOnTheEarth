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

    react(caption) {
        if (Global.holdedItem != '报纸') {
            cc.loader.loadRes('itemtext/电池', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        } else {
            var remove = cc.callFunc(function() {
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('报纸');
            }, this);
            var get = cc.callFunc(function() {
                this.getComponent('canGetBgItem').getByUsr('get电池');
            }, this);
            var action = cc.sequence(remove, get);
            this.node.runAction(action);

            // this.getComponent('canGetBgItem').getByUsr('get电池');
        }
    },

    // update (dt) {},
});