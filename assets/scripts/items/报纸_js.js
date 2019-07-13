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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    react(caption) {
        var fname;
        if (Global.foundEye) {
            // Global.getpwd = true;
            // cc.loader.loadRes('itemtext/报纸cond', cc.TextAsset, function(err, res) {
            //     caption.getComponent('caption').talk(res);
            // });

            var puzzle = '> 发现谜团：2114年3月25日'
            this.getComponent('canGetBgItem').getByUsr();

        } else {
            cc.loader.loadRes('itemtext/报纸', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        }
    },
    // LIFE-CYCLE CALLBACKS:

    start() {

    },

    // update (dt) {},
});