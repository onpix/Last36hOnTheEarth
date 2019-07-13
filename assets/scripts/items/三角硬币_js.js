cc.Class({
    extends: cc.Component,

    properties: {
        inputTrashText: cc.TextAsset, // 放入新垃圾的文字
        noConditionText: cc.TextAsset,
        refuseText: cc.TextAsset,
    },

    AinB(a, b) {
        // a: object
        // b: array
        for (var i = 0; i < b.length; i++)
            if (b[i] == a)
                return true;
        return false;
    },

    have_key(items, now, bag) {
        for (var i = 0; i < bag.length; i++) {
            if (bag[i] == now)
                continue;
            else if (this.AinB(bag[i], items)) {
                return 1;
            }
        }
        cc.log(items, bag, now);
        return 0;
    },

    react(caption) {
        var trashs = ['易拉罐', '长杆', '空瓶', '导线', '纽扣']
        if (this.AinB(Global.holdedItem, trashs)) {
            this.items0 = ['导航仪', '长杆', '核反应堆', '断树枝', '肥料', ];
            this.items1 = ['水瓶', '易拉罐', '撬棍', '导线', '空瓶', '锈工具箱'];
            this.items2 = ['种子', '新工具箱', '三角硬币', '纽扣'];

            var bag = cc.find('Canvas/bg_up/bag').getComponent('bag').itemList;
            // var res0 = this.have_key(this.items0, Global.holdedItem, bag)
            // var res1 = this.have_key(this.items1, Global.holdedItem, bag)
            // var res2 = this.have_key(this.items2, Global.holdedItem, bag)

            var res0 = 1;
            var res1 = 1;
            var res2 = 1;

            if (!(res0 && res1 && res2)) {
                // 放入后会无法进门，拒绝放入
                caption.getComponent('caption').talk(this.refuseText);
            } else {
                // 可以放入垃圾
                Global.trashNum++;
                if (Global.trashNum == 5) {
                    cc.find('Canvas/bg_up/bag').getComponent('bag').remove(Global.holdedItem);
                    this.getComponent('canGetBgItem').getByUsr();
                } else {
                    caption.getComponent('caption').talk(this.inputTrashText);
                    cc.find('Canvas/bg_up/bag').getComponent('bag').remove(Global.holdedItem);
                }
            }
        } else {
            caption.getComponent('caption').talk(this.noConditionText);
        }
    },
});