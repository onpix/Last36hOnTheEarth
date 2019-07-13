cc.Class({
    extends: cc.Component,

    properties: {
        file: cc.TextAsset,
        interval: 0.03, // 打字时间间隔
        delay: 0,
        player: cc.Node,
        puzzle: cc.Node, // 谜题node
        skipNode: cc.Node,
    },

    end_caption() {
        this.getComponent(cc.RichText).string = '';
        this.skipNode.active = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.captionOnKeyUp, this);
        Global.CanControlPlayer = true;

        // 弹出谜题提示
        if (this.puzzleText !== undefined && Global.canEmitPuzzle) {
            this.puzzle.getComponent('puzzle').show(this.puzzleText);
            Global.canEmitPuzzle = false;
        }

        if (this.callbak !== null && this.callbak !== undefined) {
            cc.log('caption callback:', this.callbak, 'args: ', this.opt);
            this.callbak(this.opt);
            this.callbak = null;
        }
    },

    captionOnKeyUp(event) {
        if (event.keyCode != cc.macro.KEY.q && event.keyCode != cc.macro.KEY.a && event.keyCode != cc.macro.KEY.d) {
            if (this.now_ix == this.data.length) {
                // 整个对话结束：
                this.end_caption();
            } else {
                if (this.now_ix != 0)
                    this.oneline(this.data[this.now_ix]);
                this.now_ix++;
            }
        }
    },

    oneline(str, color) {
        if (Global.debug)
            cc.log('start line:', str);
        if (color === undefined)
            color = '<color=#ffffff>';
        var text = this.getComponent(cc.RichText);

        var repeat = str.length - 1; // 重复次数 = 字符串长度 - 1
        var delay = 0; // 我们在1秒后开始运行
        var showedString = '';
        var j = 0;
        this.schedule(function() {
            showedString += str[j];
            text.string = color + showedString + '</c>';
            j++;
            if (j >= (str.length) * 3 / 4)
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.captionOnKeyUp, this);
            else
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.captionOnKeyUp, this);

        }, this.interval, repeat, delay);
    },

    talk(file, callbak, opt, puzzleText) {
        this.skipNode.active = true;
        this.SkipNow = false;

        this.puzzleText = puzzleText;
        if (Global.deepdebug)
            cc.log('start caption:', file);
        // cc.log('caption callbalk:', callbak, opt);
        if (file === undefined)
            file = this.file;
        Global.CanControlPlayer = false;
        if (callbak === undefined) {
            this.callbak = null;
            this.opt = null;
        } else {
            this.callbak = callbak;
            this.opt = opt;
        }

        this.now_ix = 0;
        var text = file.text;
        if (file.text === undefined)
            text = file;
        this.data = text.split('\n');
        cc.log('first:', this.data[this.now_ix])
        this.oneline(this.data[this.now_ix]);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.captionOnKeyUp, this);
    },

});