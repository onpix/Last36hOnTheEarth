cc.Class({
    extends: cc.Component,

    properties: {
        puzzle: cc.Node,
        title: cc.Node,
        player: cc.Node,
        player_mask: cc.Node,
        captionNode: cc.Node,
        fade: cc.Node, // 黑色渐变遮罩
        pause: cc.Node,
        bag: cc.Node, // 实际是一个toggleContainer
        pauseBg: cc.Node,
        transparentImg: cc.SpriteFrame,

        maxLeft: -470,
        maxRight: 430,

        // 地上场景：
        scene0nodes: {
            default: [],
            type: [cc.Node],
        },
        scene1nodes: {
            default: [],
            type: [cc.Node],
        },
        scene2nodes: {
            default: [],
            type: [cc.Node],
        },
        scene3nodes: {
            default: [],
            type: [cc.Node],
        },
        scene4nodes: {
            default: [],
            type: [cc.Node],
        },
        //地下室：
        underScene: {
            default: [],
            type: [cc.Node],
        },
    },



    // ####################### Scene Control：#############################
    EnableOneScene(targetScene) {
        var i;
        for (i = 0; i < this.scene0nodes.length; i++)
            this.scene0nodes[i].active = false;
        for (i = 0; i < this.scene1nodes.length; i++)
            this.scene1nodes[i].active = false;
        for (i = 0; i < this.scene2nodes.length; i++)
            this.scene2nodes[i].active = false;
        for (i = 0; i < this.scene3nodes.length; i++)
            this.scene3nodes[i].active = false;
        for (i = 0; i < this.scene4nodes.length; i++)
            this.scene4nodes[i].active = false;
        for (i = 0; i < this.underScene.length; i++)
            this.underScene[i].active = false;
        for (i = 0; i < targetScene.length; i++)
            targetScene[i].active = true;
    },
    getLeftScene() {
        var bak = null;
        // 这里的i竟然是字符串索引 惊了
        for (var i in this.switchbleScenes) {
            if (this.currentScene == this.switchbleScenes[i])
                return bak;
            bak = this.switchbleScenes[i];
        }
        return null;
    },
    getRightScene() {
        var i = 0;
        for (i = 0; i < this.switchbleScenes.length; i++)
            if (this.currentScene == this.switchbleScenes[i]) {
                return this.switchbleScenes[i + 1];
            }
        return null;
    },

    callback1() {
        this.EnableOneScene(this.nextscene);
        this.currentScene = this.nextscene;
        this.player.x = this.newPlayerX;
        this.fade.active = true;
        Global.CanControlPlayer = true;
    },
    callback2() {
        // this.fade.active = false;
        this.isLoadingScene = false;
        this.player.xSpeed = 0;
    },
    loadscene(nextscene, newPlayerX) {
        if (newPlayerX === undefined)
            newPlayerX = this.player.x;
        this.nextscene = nextscene;
        this.newPlayerX = newPlayerX;
        this.isLoadingScene = true;
        this.fade.active = true;
        Global.CanControlPlayer = false;

        var callbak1 = cc.callFunc(this.callback1, this);
        var callbak2 = cc.callFunc(this.callback2, this);
        var action = cc.sequence(cc.fadeIn(1), callbak1, cc.fadeOut(1), callbak2)
        this.fade.runAction(action);
    },
    updateScene() {
        if (!this.isLoadingScene) {
            if (this.player.x <= this.maxLeft + 1) {
                var left = this.getLeftScene();
                if (left != null) {
                    this.loadscene(left, this.maxRight - 5);
                }
            } else if (this.player.x >= this.maxRight - 1) {
                var right = this.getRightScene();
                if (right != null) {
                    this.loadscene(right, this.maxLeft + 5);
                }

            }
        }
    },

    switchPause() {
        var callbak = cc.callFunc(function() {
            this.pauseBg.active = !this.pauseBg.active;
        }, this);
        this.fade.active = true;
        var action = cc.sequence(cc.fadeIn(0.8), callbak, cc.fadeOut(0.8));
        this.fade.runAction(action)

        if (this.isPausing) {
            this.playerjs.turnOn();
        } else {
            this.playerjs.turnOff();
        }
        this.isPausing = !this.isPausing;
    },


    // ######################### LifeCycle Callback: ###############################
    onLoad() {
        // 开启默认关闭的遮罩节点：
        // this.ItemNodes[0].getComponent(cc.Sprite).SpriteFrame = this.transparentImg;
        this.player_mask.active = true;
        this.fade.active = true;
        // 可以通过左右移动切换的场景列表：
        this.switchbleScenes = [this.scene0nodes, this.scene1nodes, this.scene2nodes, this.scene3nodes, this.scene4nodes, null];

        var c = this.scene1nodes;
        // var c = this.scene4nodes;

        this.currentScene = c;
        this.EnableOneScene(c);

        this.playerjs = this.player.getComponent('player');
        this.isLoadingScene = false; // 是否正在加载，用于加锁
        this.isPausing = false;

        this.bagjs = this.bag.getComponent('bag');

        // 开启碰撞
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        if (Global.debug)
            manager.enabledDebugDraw = true;

        this.playerjs.loadPlayer();
        this.bagjs.loadBag();
    },

    captionCallbak() {
        // var puzzleText = '> 发现谜团：这里...是哪里？'
        // this.captionNode.getComponent('caption').talk(undefined, undefined, undefined, puzzleText);
        // this.title.active = true;
        var action = cc.sequence(cc.fadeIn(2), cc.fadeOut(2));
        this.title.runAction(action);
        this.captionNode.getComponent('caption').talk();
        // cc.log('callbak1!');
        this.fade.active = false;
    },
    start() {
        if (Global.debug) {
            this.playerjs.turnOn();
            this.playerjs.maxSpeed = 1000;
            this.playerjs.accel = 100000;
            // this.player_mask.active = false;
            this.fade.active = false;
            // this.player.x = this.maxRight;
        } else {
            // 进场渐变:
            var showTitle = cc.callFunc(this.showTitle, this);
            var callbak = cc.callFunc(this.captionCallbak, this);
            var action = cc.sequence(cc.fadeOut(3), callbak);
            this.fade.runAction(action);
        }
        // this.bagjs.updateBag(['电池', '导线']);
        // this.bagjs.add('导航仪');
        // this.bagjs.add('长杆');

    },

    update(dt) {
        this.playerjs.updatePlayer(dt);
        this.updateScene();

        this.player.x = Math.min(Math.max(this.player.x, this.maxLeft), this.maxRight);
        this.player_mask.x = this.player.x;
        this.puzzle.x = this.player.x;

        // 控制暂停按钮可用性
        if (!Global.CanControlPlayer && !this.isPausing)
            this.pause.active = false;
        else
            this.pause.active = true;
        this.bag.active = this.pause.active; // 背包与暂停同步

        // cc.log(this.bagjs.itemList, Global.holdedItem);
        // 更新遮罩
        // if (Global.foundEye)
        //     this.player_mask.remove();
        if (Global.debug) {
            this.playerjs.maxSpeed = 1000;
            this.playerjs.accel = 100000;
            var manager = cc.director.getCollisionManager();
            manager.enabledDebugDraw = true;
        }
    },

    win() {
        cc.director.loadScene('Level2');
    },

});