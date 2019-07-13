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
        leval1: cc.Node,
        f1Scene: cc.Node,
        b1Scene: cc.Node,
        position: cc.String,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    react() {
        var level1js = this.leval1.getComponent('level1');
        var current = level1js.currentScene;
        var target;
        if (current == this.f1Scene)
            target = this.b1Scene;
        else
            target = this.f1Scene;
        level1js.loadscene(target); // 不指定playerX，位置不变 

        if (this.position == 'b1')
            level1js.loadscene(level1js.scene0nodes);
        else
            level1js.loadscene(level1js.underScene);
    },

    // update (dt) {},
});