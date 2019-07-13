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
        door_name: cc.String,
    },

    onCollisionStay(other, self) {
        if (!this.opened) {

            cc.log('touch door');
            var player = other.node;
            var playerjs = other.node.getComponent('player');

            player.xSpeed = 0;
            if (player.x > this.node.x - 30)
                player.x = Math.max(player.x, this.node.x + 10);
            else
                player.x = Math.min(player.x, this.node.x - 70);
        }
    },

    onLoad() {
        this.opened = false;
        // this.activeStatusProtected = true; // 是否只能由自己开启active状态
    },

    react(caption) {
        if (Global.holdedItem != this.door_name + '_card') {
            cc.loader.loadRes('itemtext/门', cc.TextAsset, function(err, res) {
                caption.getComponent('caption').talk(res);
            });
        } else if (this.door_name == 'gate') {
            if (Global.getGuider && Global.seenComputer) {
                this.opened = true;
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove(this.door_name + '_card');
                this.node.active = false;
            } else {
                cc.loader.loadRes('itemtext/大门_持门卡_条件不满足', cc.TextAsset, function(err, res) {
                    caption.getComponent('caption').talk(res);
                });
            }
        } else {
            this.opened = true;
            cc.find('Canvas/bg_up/bag').getComponent('bag').remove(this.door_name + '_card');
            this.node.active = false;
        }
    },


    update(df) {
        if (this.opened == true)
            this.node.active = false;
    },
});