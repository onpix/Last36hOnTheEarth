cc.Class({
    extends: cc.Component,

    properties: {
        getNoCondition: true, //是否不需要任何条件就可以获得
        GetCaptionText: cc.TextAsset, // 获取时显示的字幕
        puzzleStr: '', //获取时显示的谜题
    },

    onCollisionStay(other, self) {
        if (Global.pressEnter && Global.CanControlPlayer) {
            Global.pressEnter = false;
            cc.log(this.name);
            if (this.getNoCondition) {
                this.getByUsr();
            } else {
                // 有获得条件，启用个性化脚本
                var caption = cc.find('Canvas/bg_down/caption');
                var specialjs = this.getComponent(this.name + '_js'); // 个性化脚本
                specialjs.react(caption);
            }
        }
    },


    getByUsr(MaintainSelf) {
        // 如果有放字幕和谜题需求的,直接绑定到该js下
        var bagjs = cc.find('Canvas/bg_up/bag').getComponent('bag');
        var res = bagjs.add(this.name);

        if (res == 0) {
            cc.log('背包已满');
        } else {
            cc.log('get by user!');

            if (this.GetCaptionText == null || this.GetCaptionText == '') {
                // 不需要字幕,自然不需要谜题
                cc.log('No caption out');
            } else {
                var caption = cc.find('Canvas/bg_down/caption');
                var captionjs = caption.getComponent('caption');
                if (this.puzzleStr == null || this.puzzleStr == '')
                    this.puzzleStr = undefined;
                captionjs.talk(this.GetCaptionText.text, undefined, undefined, this.puzzleStr);
            }
            if (MaintainSelf === undefined)
                this.node.active = false;
        }
    },

    onLoad() {
        this.name = this.getComponent(cc.Sprite).spriteFrame.name;
    },
});