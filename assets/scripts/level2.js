cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
        captionNode: cc.Node,
        fade: cc.Node, // 黑色渐变遮罩
        white_fade: cc.Node,
        pause: cc.Node,
        bag: cc.Node, // 实际是一个toggleContainer
        pauseBg: cc.Node,

        eagle: cc.Node,
        eagleBg: cc.Node,
        skip: cc.Node,

        maxLeft: -470,
        maxRight: 430,

        // 地上场景：
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
        //过去时空：
        office1: {
            default: [],
            type: [cc.Node],
        },
        office2: {
            default: [],
            type: [cc.Node],
        },
        factory1: {
            default: [],
            type: [cc.Node],
        },
        factory2: {
            default: [],
            type: [cc.Node],
        },

        // 在加载场景时，默认关闭的节点，由节点自己开启。
        // 做某些动作后才会出现
        oldToolKit: cc.Node,
        smallTree: cc.Node,
        treeStick: cc.Node,
        debugNode: cc.Node,
        title: cc.Node,
        puzzle: cc.Node,
    },



    // ####################### Scene Control：#############################
    EnableOneScene(targetScene) {
        var i;
        for (i = 0; i < this.scene1nodes.length; i++)
            this.scene1nodes[i].active = false;
        for (i = 0; i < this.scene2nodes.length; i++)
            this.scene2nodes[i].active = false;
        for (i = 0; i < this.scene3nodes.length; i++)
            this.scene3nodes[i].active = false;
        for (i = 0; i < this.scene4nodes.length; i++)
            this.scene4nodes[i].active = false;
        for (i = 0; i < this.office1.length; i++)
            this.office1[i].active = false;
        for (i = 0; i < this.office2.length; i++)
            this.office2[i].active = false;
        for (i = 0; i < this.factory1.length; i++)
            this.factory1[i].active = false;
        for (i = 0; i < this.factory2.length; i++)
            this.factory2[i].active = false;

        // 打开当前场景：
        for (i = 0; i < targetScene.length; i++)
            targetScene[i].active = true;

        // 关闭例外节点：
        if (!Global.putTooKitIntoTank) {
            // cc.log(Global.putTooKitIntoTank, this.oldToolKit.active)
            this.oldToolKit.active = false;
        } else {
            this.oldToolKit.active = true;
        }
        if (!(Global.putSeed && Global.putKela)) {
            this.smallTree.active = false;
            this.treeStick.active = false;
        } else {
            this.smallTree.active = true;
            this.treeStick.active = true;
        }
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
        this.fadeUsed.active = true;
        Global.CanControlPlayer = true;
    },
    callback2() {
        // this.fade.active = false;
        this.isLoadingScene = false;
        this.player.xSpeed = 0;
    },
    loadscene(nextscene, newPlayerX, useWhiteFade) {
        if (newPlayerX === undefined)
            newPlayerX = this.player.x;
        if (useWhiteFade === undefined)
            this.fadeUsed = this.fade;
        else
            this.fadeUsed = this.white_fade;

        this.nextscene = nextscene;
        this.newPlayerX = newPlayerX;
        this.isLoadingScene = true;
        this.fadeUsed.active = true;
        Global.CanControlPlayer = false;

        var callbak1 = cc.callFunc(this.callback1, this);
        var callbak2 = cc.callFunc(this.callback2, this);
        if (Global.debug)
            var action = cc.sequence(cc.fadeIn(0.1), callbak1, cc.fadeOut(0.1), callbak2);
        else
            var action = cc.sequence(cc.fadeIn(1), callbak1, cc.fadeOut(1), callbak2);
        this.fadeUsed.runAction(action);
    },
    loadsceneUsingID(id, useWhiteFade) {

        var scenes = [this.scene1nodes, this.scene2nodes, this.scene3nodes, this.scene4nodes, this.office1, this.office2, this.factory1, this.factory2, ];
        var names = ['1', '2', '3', '4', 'ob1', 'ob2', 'fb1', 'fb2'];
        for (var i = 0; i < scenes.length; i++) {
            if (names[i] == id) {
                this.loadscene(scenes[i], undefined, useWhiteFade);
                return 1;
            }
        }
    },

    debugBtnLoad(event, id) {
        this.loadsceneUsingID(id);
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
        } else {
            this.player.xSpeed = 0;
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

    switchEagle() {
        this.eagleBg.active = !this.eagleBg.active;
        Global.eagleOn = !Global.eagleOn;
    },

    // ######################### LifeCycle Callback: ###############################
    onLoad() {
        // 开启默认关闭的遮罩节点：
        cc.log('load start:');
        // 开启碰撞
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        if (Global.debug)
            manager.enabledDebugDraw = true;

        this.fade.active = true;
        this.skip.active = false;
        this.white_fade.active = true;
        this.fadeUsed = this.fade;
        this.isPausing = false;

        this.playerjs = this.player.getComponent('player');
        this.bagjs = this.bag.getComponent('bag');

        // 可以通过左右移动切换的场景列表：
        this.isLoadingScene = false; // 是否正在加载，用于加锁
        // this.switchbleScenes = [this.scene1nodes, this.scene2nodes, this.scene3nodes, this.scene4nodes, null];
        this.switchbleScenes = [this.scene1nodes, this.scene3nodes, this.scene4nodes, null];
        this.currentScene = this.scene1nodes;
        this.EnableOneScene(this.currentScene);

        this.playerjs.loadPlayer();
        this.bagjs.loadBag();
    },


    captionCallbak() {
        var action = cc.sequence(cc.fadeIn(3), cc.fadeOut(3));
        this.title.runAction(action);
        var puzzleText = '> 发现谜团：荒芜世界的真相\n> 发现谜团: 被囚禁的真相'
        this.captionNode.getComponent('caption').talk(undefined, undefined, undefined, puzzleText);
        // this.captionNode.getComponent('caption').talk();
        // cc.log('callbak1!');
        this.fade.active = false;
    },
    start() {
        if (Global.debug) {
            this.playerjs.turnOn();
            this.playerjs.maxSpeed = 1000;
            this.playerjs.accel = 100000;
            this.fade.active = false;
            this.white_fade.active = false;
            cc.log('load over ');
            // this.bagjs.updateBag(['长杆', '撬棍', '锈工具箱']);
            // this.bagjs.updateBag(['导航仪', '长杆', '纽扣', '种子', '撬棍', '肥料']);
            // this.bagjs.updateBag(['导航仪', '撬棍', '导线', '长杆', '纽扣', '易拉罐', '空瓶']);
            Global.turnOffPC = true;
            this.bagjs.updateBag(['导航仪', '长杆', '撬棍']);
        } else {
            this.white_fade.active = false;
            // 进场渐变:
            var callbak = cc.callFunc(this.captionCallbak, this);
            var action = cc.sequence(cc.fadeOut(2.5), callbak);
            this.fade.runAction(action);
            this.bagjs.updateBag(['导航仪', '长杆']);
        }

        // this.bagjs.add('导航仪');

    },

    update(dt) {
        this.playerjs.updatePlayer(dt);
        this.updateScene();

        this.player.x = Math.min(Math.max(this.player.x, this.maxLeft), this.maxRight);
        this.puzzle.x = this.player.x;
        // 控制暂停按钮可用性
        if (!Global.CanControlPlayer && !this.isPausing) {
            this.pause.active = false;
        } else {
            this.pause.active = true;
        }
        // 暂停界面关闭鹰眼
        if (this.isPausing || !Global.CanControlPlayer) {
            this.eagle.active = false;
        } else {
            this.eagle.active = true;
        }
        this.bag.active = this.pause.active; // 背包与暂停同步
        if (Global.debug) {
            this.playerjs.maxSpeed = 1000;
            this.playerjs.accel = 100000;
            var manager = cc.director.getCollisionManager();
            manager.enabledDebugDraw = true;

            this.debugNode.active = true;
        }
    },
});