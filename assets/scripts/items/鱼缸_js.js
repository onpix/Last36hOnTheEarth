cc.Class({
    extends: cc.Component,

    properties: {
        putToolText: cc.TextAsset,
    },

    start() {

    },

    react(caption) {
        if (Global.holdedItem != '新工具箱') {
            cc.loader.loadRes('itemtext/鱼缸', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        } else {
            Global.putTooKitIntoTank = true;
            cc.find('Canvas/bg_up/bag').getComponent('bag').remove('新工具箱');
            caption.getComponent('caption').talk(this.putToolText.text);
        }
    },
});