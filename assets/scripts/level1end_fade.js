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

    properties: {},

    win() {
        var caption_callbak = function(aninode) {
            aninode.active = true;
            var ani = aninode.getComponent(cc.Animation);
            ani.play('fade-anim-wb');
            ani.on('finished', function() {
                cc.log('start loading level2');
                cc.director.loadScene('Level2');
                aninode.active = false;
            });
        }

        var text = '这是....一个奇怪的手表？\n' +
            '不...表带上面刻着细小的文字说明 这是一个时间潜航器！\n' +
            '指针缓缓走动着，表盘上散发着微弱的蓝光\n' +
            '表盘上显示的日期是</c><color=#ea3e55>2166.3.25\n' +
            '表盘背面雕刻着一把银钥匙的图案\n' +
            '表带上的文字说明是：\n' +
            '</c><color=#ea3e55>“可以用来短暂地回到过去的时间平面中\n' +
            '</c><color=#ea3e55>但是只有在具有特定的时间连接点的两个时间平面上才能使用\n' +
            '</c><color=#ea3e55>并且具有一定的危险性”\n' +
            '....“短暂地回到过去”...有多短暂呢？\n' +
            '真是个神奇的东西....以后也许可以派上大用场\n' +
            '我突然想起来，实验室的系统日志中有记录过\n' +
            '几天前这里曾经检测到非法侵入\n' +
            '但是入侵者破坏大门门禁时候，入侵警报就消失了\n' +
            '莫非..........\n' +
            '.......不，现在我还缺乏必要的信息\n' +
            '现在下结论还为时尚早\n' +
            '总而言之，我终于获得自由了！\n' +
            '我迫不及待地想去外面看一看\n' +
            '人类的世界究竟是怎么样的？\n' +
            '我拥有人类所拥有的知识，却从来没有体验过他们的生活...\n' +
            '而且...从实验室电脑的系统日志中获得的信息....\n' +
            '我也有许多不明白的地方....也许可以在外面的世界找到真相\n' +
            '</c><color=#ea3e55>也许...我经历的事情不像我想象的那么简单';

        if (Global.debug)
            text = '你通关惹！';
        cc.director.preloadScene('Level2');
        cc.find('Canvas/bg_down/caption').getComponent('caption').talk(text, caption_callbak, this.node);
    },

    start() {

    },

    // update (dt) {},
});