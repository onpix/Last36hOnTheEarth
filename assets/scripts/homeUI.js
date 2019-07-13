cc.Class({
    extends: cc.Component,

    properties: {
        fade_bwb_node: cc.Node,
    },

    onLoad: function() {
        cc.director.preloadScene('Level2');
    },

    // showParticle: function() {
    //     this.menuParticle.enabled = true;
    // },


    enterGame: function() {
        Global.FirstLoadScene = true;

        this.fade_bwb_node.active = true;
        var fadeAni = this.fade_bwb_node.getComponent(cc.Animation);
        fadeAni.playAdditive('fade-anim-wbw');
        cc.director.preloadScene("Level1", function() {
            cc.log("Next scene preloaded");
        });

    },

    continueGame: function() {
        cc.director.loadScene('Level2');
    },

    exit: function() {
        cc.game.end();
    },
});