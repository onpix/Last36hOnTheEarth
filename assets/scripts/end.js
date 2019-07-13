cc.Class({
    extends: cc.Component,

    properties: {
        captionNode: cc.Node,
        fade: cc.Node, // 黑色渐变遮罩
        text: cc.TextAsset,
        retro_bg: cc.Node,
    },

    captionCallbak() {
        this.captionNode.getComponent('caption').talk();
        this.fade.active = false;
    },
    onLoad() {
        if (Global.debug)
            this.fade.active = true;
        var show = cc.callFunc(function(event, text) {
            this.captionNode.getComponent('finalCaption').talk();
            this.retro_bg.active = true;
        }, this, this.text);

        var action = cc.sequence(show, cc.fadeOut(1))
        this.fade.active = true;
        this.fade.runAction(action);

        // var callbak = cc.callFunc(this.captionCallbak, this);
        // var action = cc.sequence(cc.fadeOut(2.5), callbak);
        // this.fade.runAction(action);
    },

    start() {

    },

});