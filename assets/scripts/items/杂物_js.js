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
        guider: cc.Node, // 导航仪
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    react(caption) {
        // var captionjs = caption.getComponent('caption');
        if (Global.holdedItem != '长杆') {
            fname = '杂物';
            cc.loader.loadRes('itemtext/杂物', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        } else {
            fname = '杂物cond';

            var remove = cc.callFunc(function() {
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('长杆');
                cc.log('remove!');
            }, this);
            // var get = cc.callFunc(this.getGuider, this);
            var get = cc.callFunc(function() {
                this.guider.getComponent('canGetBgItem').getByUsr();
                cc.log('get!');
            }, this);
            var action = cc.sequence(remove, get);
            this.node.runAction(action);
            // remove item:
            // cc.loader.loadRes('itemtext/杂物cond', cc.TextAsset, function(err, res) {
            //     caption.getComponent('caption').talk(res);
            // });
        }


    },

    start() {

    },

});