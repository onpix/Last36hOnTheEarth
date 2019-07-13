cc.Class({
    extends: cc.Component,

    properties: {
        interval: 0.07,
        stay: 1,
    },
    reset() {
        this.text.string = '';
    },

    show(str) {
        // var str = this.str;
        this.node.opacity = 255;
        this.text = this.getComponent(cc.Label);
        this.text.string = '';
        var j = 0;
        this.schedule(function() {
            this.text.string += str[j];
            j++;
            if (j == str.length) {
                Global.canEmitPuzzle = true;
                this.scheduleOnce(function() {
                    cc.log('puzzle fadeout');
                    var reset = cc.callFunc(this.reset, this);
                    var action = cc.sequence(cc.fadeOut(1), reset);
                    this.node.runAction(action);
                }, this.stay);
            }
        }, this.interval, str.length - 1, 0);
    },
});