cc.Class({
    extends: cc.Component,

    properties: {
        itemList: [],
        // containers: [],
    },

    setItemSprite(targetNode, name) {
        var sp1 = targetNode.getChildByName('Background').getComponent(cc.Sprite);
        var sp2 = targetNode.getChildByName('checkmark').getComponent(cc.Sprite);
        var path = '/items/' + name + '_icon'
        cc.loader.loadRes(path, cc.SpriteFrame, function(err, sp) {
            sp1.spriteFrame = sp;
        });
        cc.loader.loadRes(path, cc.SpriteFrame, function(err, sp) {
            sp2.spriteFrame = sp;
        });
    },

    updateBag(itemList) {
        this.itemList = itemList;

        var itemNum = itemList.length;
        var totalNum = this.containers.length;
        for (var i = 0; i < totalNum; i++) {
            if (i < itemNum) {
                var name = itemList[i];
                this.setItemSprite(this.containers[i], name);
                this.containers[i].getComponent(cc.Toggle).interactable = true;
            } else {
                var name = '透明';
                this.setItemSprite(this.containers[i], name);
                this.containers[i].getComponent(cc.Toggle).interactable = false;
            }
        }
    },

    add(name) {
        if (this.itemList.length <= 10) {
            this.itemList.push(name);
            cc.log('add item:', name);
            cc.log('add-before:', this.itemList);
            this.updateBag(this.itemList);
            cc.log('add-after:', this.itemList);
            return 1;
        } else {
            cc.log('背包已满');
            return 0;
        }
    },

    remove(name) {
        cc.log('remov:', name);
        cc.log('remove-before:', this.itemList);
        var ix = -1;
        var n = this.itemList.length;
        for (var i = 0; i < n; i++) {
            if (name == this.itemList[i]) {
                ix = i;
                break;
            }
        }
        if (ix != -1) {
            this.itemList.splice(ix, 1);
            cc.log('remove-after:', this.itemList);
            this.updateBag(this.itemList);
        } else {
            cc.log('remove error: remove repeatly');
        }
    },

    loadBag() {
        this.containers = this.node.children;
        this.itemList = [];
        this.currentItemIx = 0;
    },

    chooseItem: function(event, str_id) {
        Global.neverClickItem = false;
        var ix = Number(str_id) - 1;
        this.getComponent(cc.AudioSource).play()
        if (ix < this.itemList.length) {
            this.currentItemIx = ix;
            // if (ix + 1 > this.itemList.length)
            //     Global.holdedItem = null;
            // else
            //     Global.holdedItem = this.itemList[ix];
            // Global.holdedItem = this.itemList[]
        }
    },

    update(dt) {
        if (this.currentItemIx + 1 > this.itemList.length)
            Global.holdedItem = null;
        else
            Global.holdedItem = this.itemList[this.currentItemIx];
        // cc.log(this.itemList, Global.holdedItem);
    },

});