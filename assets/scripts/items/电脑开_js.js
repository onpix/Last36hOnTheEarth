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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.afterCaption = ''; //看完电脑的感想
    },
    react(caption) {
        if ((Global.foundEye && Global.foundBattery) || Global.deepdebug) {

            Global.seenComputer = true;
            var show = cc.callFunc(function(event, text) {
                this.screenCaption.getComponent('start_caption').talk(text);
                this.retro_bg.active = true;
            }, this, this.afterText.text);

            var action = cc.sequence(show, cc.fadeOut(1))
            this.fade.active = true;
            this.fade.runAction(action);

        } else {

            cc.loader.loadRes('itemtext/电脑开', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
                // caption.getComponent('caption').talk(res, undefined, undefined, '> 谜团：循环往复的36小时');
            });
        }
    },

    start() {

    },

    // update (dt) {},
});