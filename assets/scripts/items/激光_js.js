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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onCollisionStay(other, self) {
        var player = other.node;
        var playerjs = other.node.getComponent('player');
        // cc.log('接触安检激光, player:', player.x, 'laser:', this.node.x)

        player.xSpeed = 0;
        // if (player.x > this.node.x - 30)
        //     player.x = Math.max(player.x, this.node.x + 40);
        // else
        //     player.x = Math.min(player.x, this.node.x - 60);
        if (player.x > this.node.x + 30)
        //右侧靠近 
            player.x = Math.max(player.x, this.node.x + 60);
        else if (player.x < this.node.x + 30)
        // 左侧靠近
            player.x = Math.min(player.x, this.node.x - 60);
    },
    // update (dt) {},
});