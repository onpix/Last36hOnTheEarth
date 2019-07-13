cc.Class({
    extends: cc.Component,

    properties: {
        gates: {
            default: [],
            type: [cc.Node],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    turnOn() {
        for (var i = 0; i < this.gates.length; i++) {
            this.gates[i].active = true;
        }
    },
    turnOff() {
        for (var i = 0; i < this.gates.length; i++) {
            this.gates[i].active = false;
        }
    },

    update(dt) {
        if (Global.eagleOn) {
            this.turnOn();
        } else {
            this.turnOff();
        }
    },
});