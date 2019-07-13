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
        text: cc.TextAsset,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    react(caption) {
        var captionjs = caption.getComponent('caption');
        var puzzleStr = '> 谜团解明:荒芜世界的真相\n> 发现谜团: 撕掉的笔记\n>发现谜团：被囚禁的真相\n>发现谜团: Dr.Chris的计划'
        captionjs.talk(this.text, undefined, undefined, puzzleStr);
    },
    // update (dt) {},
});