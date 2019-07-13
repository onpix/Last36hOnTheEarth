cc.Class({
    extends: cc.Component,
    // 不可被拾取的物品交互

    properties: {
        NoCondition: true,
        captionText: cc.TextAsset, // 仅在NoCondition启用时有效
        puzzleStr: '', // 仅在NoCondition启用时有效
    },

    onCollisionStay(other, self) {
        if (Global.debug)
            this.captionText = '不可获取物品无条件输出字幕';
        if (Global.pressEnter && Global.CanControlPlayer) {
            Global.pressEnter = false;

            var caption = cc.find('Canvas/bg_down/caption');
            var name = this.getComponent(cc.Sprite).spriteFrame.name
            if (this.NoCondition) {
                // 无条件输出字幕或谜题
                var captionjs = caption.getComponent('caption');

                if (this.puzzleStr != '' && this.puzzleStr != null) {
                    captionjs.talk(this.captionText, undefined, undefined, this.puzzleStr);
                } else
                    captionjs.talk(this.captionText);
            } else {
                // 有条件 进行处理
                var specialjs = this.getComponent(name + '_js'); // 个性化脚本
                specialjs.react(caption);
            }

            cc.log('get interactive msg, name:', name);
            cc.log('holding:', Global.holdedItem);
        }
    },

});