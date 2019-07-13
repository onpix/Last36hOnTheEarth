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
        robo_eye: cc.Node,
        noConditionText: cc.TextAsset,
        offText: cc.TextAsset, // 已经关闭电脑的字幕
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    react(caption) {
        if (Global.turnOffPC) {
            if (Global.holdedItem == '撬棍') {

                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('撬棍');
                this.getComponent('canGetBgItem').getByUsr();
            } else {

                caption.getComponent('caption').talk(this.offText.text);
            }

        } else {
            caption.getComponent('caption').talk(this.noConditionText.text);
        }
    },

    update() {
        if (Global.turnOffPC)
            this.robo_eye.active = false;
    }
});