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
        // 约定： 场景ID编码见level2中。
        level2: cc.Node,
        nowSceneID: cc.String, // now
        bak1SceneID: cc.String, // bak1
        bak2SceneID: cc.String, //bak2
        currentSceneID: cc.String,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    AinB(a, b) {
        // a: object
        // b: array
        for (var i = 0; i < b.length; i++)
            if (b[i] == a)
                return true;
        return false;
    },

    callbak() {
        // 传送动画播放结束后
        var level2js = this.level2.getComponent('level2');
        level2js.loadsceneUsingID(this.ID_i, true);
        this.ani.play('银色门');
        this.node.getChildByName('flare').active = false;
        cc.log('Load:', this.ID_i);
    },

    onCollisionStay(other, self) {
        if (Global.pressEnter && Global.CanControlPlayer) {
            Global.pressEnter = false;
            this.items0 = ['导航仪', '长杆', '核反应堆', '断树枝', '肥料', ];
            this.items1 = ['水瓶', '易拉罐', '撬棍', '导线', '空瓶', '锈工具箱'];
            this.items2 = ['种子', '新工具箱', '三角硬币', '纽扣', '铲子'];

            this.items = [this.items0, this.items1, this.items2]
            this.scenesID = [this.nowSceneID, this.bak1SceneID, this.bak2SceneID]

            var level2js = this.level2.getComponent('level2');
            for (var i = 0; i < 3; i++) {
                var ID_i = this.scenesID[i]
                cc.log('SceneID:', ID_i, 'current:', this.currentSceneID);
                if (ID_i != this.currentSceneID) {
                    // if (Global.holdedItem in this.items[i])
                    if (this.AinB(Global.holdedItem, this.items[i])) {
                        this.ID_i = ID_i;
                        this.ani = this.getComponent(cc.Animation);
                        var res = this.ani.play('传送');
                        if (Global.debug)
                            res.speed = 2;
                        else
                            res.speed = 0.6;
                        this.node.getChildByName('flare').active = true;
                        this.ani.on('finished', this.callbak, this);
                        // this.scheduleOnce(function() {
                        //     level2js.loadsceneUsingID(ID_i, true);
                        // }, 2);
                        return 1;
                    }

                }
            }
            var captionjs = cc.find('Canvas/bg_down/caption').getComponent('caption');
            captionjs.talk('「门」似乎没有反应');
        }
    },
});