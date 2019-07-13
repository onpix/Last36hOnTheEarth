cc.Class({
    extends: cc.Component,

    properties: {
        putSeed: cc.TextAsset,
        putKela: cc.TextAsset,
        noCondText: cc.TextAsset
    },

    react(caption) {
        if (Global.holdedItem == '种子') {
            cc.find('Canvas/bg_up/bag').getComponent('bag').remove('种子');
            Global.putSeed = true;
            caption.getComponent('caption').talk(this.putSeed.text);
        } else if (Global.holdedItem == '肥料') {
            cc.find('Canvas/bg_up/bag').getComponent('bag').remove('肥料');
            Global.putKela = true;
            caption.getComponent('caption').talk(this.putKela.text);

        } else {
            caption.getComponent('caption').talk(this.noCondText.text);
        }

        if (Global.putKela && Global.putSeed) {
            Global.plantTree = true;
        }
    },

    // update (dt) {},
});