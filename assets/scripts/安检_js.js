cc.Class({
    extends: cc.Component,

    properties: {
        //  节点图图层结构：
        //   半损坏的安检(绑定本js)   导线(使用enabled控制碰撞组件开关)    激光器
        //   损坏的安检
        lighter: cc.Node,
        line: cc.Node,
        destoriedGate: cc.Node,
        destoryText: cc.TextAsset, // 成功破坏的文本
        noCondText: cc.TextAsset,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },


    react(caption) {
        if (Global.holdedItem == '水瓶') {
            cc.find('Canvas/bg_up/bag').getComponent('bag').remove(Global.holdedItem);
            cc.find('Canvas/bg_up/bag').getComponent('bag').add('空瓶');
            caption.getComponent('caption').talk(this.destoryText.text);

            this.destoriedGate.getComponent(cc.BoxCollider).enabled = true;
            this.line.getComponent(cc.BoxCollider).enabled = true;
            this.lighter.active = false;
            this.node.active = false;
        } else {
            caption.getComponent('caption').talk(this.noCondText.text);
        }

    },
});