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
        maxSpeed: 150,
        accel: 500,
    },

    onKeyDown(event) {
        // set a flag when key pressed
        if (Global.CanControlPlayer) {

            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.accLeft = true;
                    this.left_player.active = true;
                    this.right_player.active = false;
                    // this.anim.play('player_mov_left');
                    break;
                case cc.macro.KEY.d:
                    this.accRight = true;
                    this.left_player.active = false;
                    this.right_player.active = true;
                    // this.anim.play('player_mov_right');
                    break;
                case cc.macro.KEY.q:
                    // Global.pressEnter = true;
                    Global.pressEnter = true;
                    // this.node.emit('interactStart');
                    break;
            }
        }
    },

    onKeyUp(event) {
        // unset a flag when key released
        if (Global.CanControlPlayer) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.accLeft = false;
                    this.xSpeed = 0;
                    // this.anim.stop('player_mov_left');
                    break;
                case cc.macro.KEY.d:
                    this.accRight = false;
                    this.xSpeed = 0;
                    // this.anim.stop('player_mov_right');
                    break;
                case cc.macro.KEY.q:
                    Global.pressEnter = false;
                    // this.node.emit('interact');
                    break;
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:
    action: function(ani) {
        if (!this.anim.currentClip || this.anim.currentClip.name != ani) {
            this.anim.playAdditive(ani);
        }
    },

    loadPlayer() {
        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;
        // Global.CanControlPlayer = false;

        this.anim = this.getComponent(cc.Animation);
        this.right_player = this.node.getChildByName("right");
        this.left_player = this.node.getChildByName("left");
        // this.right_player.active = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        cc.log('player loaded over');
    },

    // 供外部脚本控制player：
    turnOn() {
        // start listening keyboard event:
        Global.CanControlPlayer = true;
    },

    turnOff() {
        Global.CanControlPlayer = false;
    },

    onDestroy() {
        // remove listening keyboard event:
        Global.CanControlPlayer = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    updatePlayer: function(dt) {
        // 在外部进行更新 根据当前加速度方向每帧更新速度
        if (Global.CanControlPlayer) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

            if (this.accLeft)
                this.xSpeed -= this.accel * dt;
            else if (this.accRight)
                this.xSpeed += this.accel * dt;

            if (Math.abs(this.xSpeed) > this.maxSpeed)
            // if speed reach limit, use max speed with current direction
                this.xSpeed = this.maxSpeed * this.xSpeed / Math.abs(this.xSpeed);

            // update player's position:
            this.node.x += this.xSpeed * dt;
        } else {
            this.xSpeed = 0;
            this.accLeft = false;
            this.accRight = false;
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
    },
});