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
        bag: cc.Node,
        player: cc.Node,
        player_mask: cc.Node,
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    repair(name, caption) {
        var remove = cc.callFunc(function() {
            var bag = this.bag.getComponent('bag');
            bag.remove(name);
        }, this);
        var talk = cc.callFunc(function() {
            cc.loader.loadRes('itemtext/加工台_' + name, cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        }, this);
        var action = cc.sequence(remove, talk);
        this.node.runAction(action);
    },

    react(caption) {
        if (Global.holdedItem == '芯片') {
            this.repair('芯片', caption);
            Global.foundEye = true;
            this.player_mask.getComponent('blind_mask').remove();
        } else if (Global.holdedItem == '电池') {
            this.repair('电池', caption);
            Global.foundBattery = true;
            this.player.getComponent('player').maxSpeed += 300;
        } else {
            cc.loader.loadRes('itemtext/加工台', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        }
    },
});