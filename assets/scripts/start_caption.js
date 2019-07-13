cc.Class({
    extends: cc.Component,

    properties: {
        file: cc.TextAsset,
        interval: 0.07,
        delay: 2,
        fade: cc.Node, // 只有电脑需要该成员
        father: cc.Node, // 只有电脑需要该成员
        // player: cc.Node,
        loadLevel1: true,
        endGame: false,
        puzzleText: cc.TextAsset, // 播放结束后，且字幕结束后，显示谜题。
    },

    clipStr(str) {
        //修建字符串到10行以内
        function insertStr(soure, start_ix, newStr) {
            return soure.slice(0, start_ix) + newStr + soure.slice(start_ix);
        }
        var data = str.split('\n');
        if (data.length >= 14) {
            var n = str.length;
            var num = 0;
            for (var i = 0; i < n; i++) {
                num++;
                if (str[i] == '\n')
                    break;
            }
            str = str.slice(num);
            // str = insertStr(str, 0, '<color=#55e551>');
        }
        return str;
    },


    talk(talkAfterCaptionText) {
        if (Global.debug)
            this.interval = 0.005;
        // 仅用于开头过场动画和电脑动画：
        if (talkAfterCaptionText === undefined)
            talkAfterCaptionText = null;
        var str = this.file.text;
        if (Global.debug)
            str = '测试多行字幕\n测试多行字幕\n测试多行字幕';
        // this.text = this.getComponent(cc.Label);
        this.text = this.getComponent(cc.RichText);
        this.text.string = '';
        this.bak_string = '';
        var j = 0;
        Global.CanControlPlayer = false;
        this.schedule(function() {
            this.bak_string += str[j];
            // var tmp = this.text.string + str[j];
            if (str[j] == '\n')
            // tmp = this.clipStr(tmp);
                this.bak_string = this.clipStr(this.bak_string);
            // this.text.string = '<color=#55e551>' + tmp + '</color>';
            this.text.string = '<color=#55e551>' + this.bak_string + '</color>';

            j++;
            if (j == str.length) {
                // if (this.node.name == 'screen-caption') {
                if (this.loadLevel1) {
                    // 过场动画结束：
                    cc.director.loadScene('Level1');
                } else if (this.endGame) {
                    cc.director.loadScene('MainMenu');
                } else {
                    this.fade.active = true;
                    var disable = cc.callFunc(function() {
                        this.father.active = false;
                        this.text.string = '';
                        Global.CanControlPlayer = true;
                        // this.fade.active = false;
                    }, this);

                    var remove_fade = cc.callFunc(function() {
                        this.fade.active = false;
                    }, this);

                    if (talkAfterCaptionText != null) {
                        // 电脑播放结束后，开始剧情对话
                        var talk = cc.callFunc(function(event, text) {
                            var caption = cc.find('Canvas/bg_down/caption');
                            caption.getComponent('caption').talk(text, undefined, undefined, this.puzzleText.text);
                        }, this, talkAfterCaptionText);

                        var action = cc.sequence(cc.fadeIn(1), disable, cc.fadeOut(1), remove_fade, talk)
                    } else {
                        var action = cc.sequence(cc.fadeIn(1), disable, cc.fadeOut(1), remove_fade)
                    }
                    this.fade.runAction(action);
                }

            }
        }, this.interval, str.length - 1, this.delay);
    },
});