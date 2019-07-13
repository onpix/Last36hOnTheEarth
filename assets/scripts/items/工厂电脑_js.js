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
        retro_bg: cc.Node,
        screenCaption: cc.Node,
        fade: cc.Node,
        afterText: cc.TextAsset, // 看完电脑的感想
        turnOffText: cc.TextAsset, // 关闭电脑的字幕
        noCondText: cc.TextAsset,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.afterCaption = ''; //看完电脑的感想
    },

    start() {

    },

    onCollisionStay(other, self) {
        if (Global.debug)
            this.afterText.text = '工厂电脑字幕';
        if (Global.pressEnter && Global.CanControlPlayer) {
            Global.pressEnter = false;
            var caption = cc.find('Canvas/bg_down/caption');
            var captionjs = caption.getComponent('caption');

            if (Global.holdedItem == '锈工具箱') {
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('锈工具箱');
                Global.turnOffPC = true;
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove(Global.holdedItem);
                captionjs.talk(this.turnOffText.text);
            } else if (Global.turnOffPC) {
                // 播放剧情
                var show = cc.callFunc(function(event, text) {
                    this.screenCaption.getComponent('start_caption').talk(text);
                    this.retro_bg.active = true;
                }, this, this.afterText.text);

                var action = cc.sequence(show, cc.fadeOut(1))
                this.fade.active = true;
                this.fade.runAction(action);

            } else {
                captionjs.talk(this.noCondText.text);
            }
        }
    },
    // update (dt) {},
});