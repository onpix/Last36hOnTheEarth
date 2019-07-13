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
        noConditionText: cc.TextAsset,
        // installGuiderText: cc.TextAsset,
        // installKernelText: cc.TextAsset,
        winText: cc.TextAsset,
        winFade: cc.Node,
    },


    win_bak() {
        var caption_callbak = function(aninode) {
            aninode.active = true;
            var ani = aninode.getComponent(cc.Animation);
            ani.play('fade-anim-wb');
            ani.on('finished', function() {
                cc.log('starting loading staff-list');
                cc.director.loadScene('end');
                aninode.active = false;
            });
        }

        cc.director.preloadScene('end');
        cc.find('Canvas/bg_down/caption').getComponent('caption').talk(this.winText.text, caption_callbak, this.winFade);
    },


    win() {
        this.winFade.active = true;
        var ani = this.winFade.getComponent(cc.Animation);
        ani.play('fade-anim-wb');
        ani.on('finished', function() {
            cc.log('starting loading staff-list');
            cc.director.loadScene('end');
        }, this);
    },


    onCollisionStay_bak(other, self) {
        // 备份：导航仪和反应堆没有先后顺序
        var player = other.node;
        var playerjs = other.node.getComponent('player');
        player.xSpeed = 0;
        if (player.x > this.node.x + 30)
        //右侧靠近 
            player.x = Math.max(player.x, this.node.x + this.rightBoxLen);
        else if (player.x < this.node.x + 30)
        // 左侧靠近
            player.x = Math.min(player.x, this.node.x - 100);


        if (Global.pressEnter && Global.CanControlPlayer) {
            Global.pressEnter = false;
            var caption = cc.find('Canvas/bg_down/caption');

            if (Global.holdedItem == '导航仪') {
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('导航仪');
                Global.installedGuider = true;
                if (!Global.installedKernel)
                    caption.getComponent('caption').talk(this.installGuiderText.text);
            } else if (Global.holdedItem == '核反应堆') {
                cc.find('Canvas/bg_up/bag').getComponent('bag').remove('核反应堆');
                Global.installedKernel = true;
                if (!Global.installedGuider)
                    caption.getComponent('caption').talk(this.installKernelText.text);
            } else {
                caption.getComponent('caption').talk(this.noConditionText.text);
            }

            if (Global.installedGuider && Global.installedKernel) {
                this.win();
            }

        }
    },
    onCollisionStay(other, self) {
        var player = other.node;
        var playerjs = other.node.getComponent('player');
        player.xSpeed = 0;
        if (player.x > this.node.x + 30)
        //右侧靠近 
            player.x = Math.max(player.x, this.node.x + 90);
        else if (player.x < this.node.x + 30)
        // 左侧靠近
            player.x = Math.min(player.x, this.node.x - 85);

        if (Global.pressEnter && Global.CanControlPlayer) {
            Global.pressEnter = false;
            var caption = cc.find('Canvas/bg_down/caption');
            if (Global.holdedItem == '核反应堆') {
                this.win();
            } else {
                caption.getComponent('caption').talk(this.noConditionText.text);
            }
        }
    },
    // update (dt) {},
});