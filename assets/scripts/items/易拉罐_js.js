cc.Class({
    extends: cc.Component,

    properties: {},

    start() {

    },

    react(caption) {
        if (Global.holdedItem != '断树枝') {
            cc.loader.loadRes('itemtext/易拉罐', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        } else {
            var remove = cc.callFunc(function() {
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('断树枝');
            }, this);
            var get = cc.callFunc(function() {
                this.getComponent('canGetBgItem').getByUsr();
            }, this);
            var action = cc.sequence(remove, get);
            this.node.runAction(action);
        }
    },
    // update (dt) {},
});