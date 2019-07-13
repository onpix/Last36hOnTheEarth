window.Global = {
    CanControlPlayer: false,
    PlayerX: 0, // 用于存档
    PlayerY: 0,
    // debug: false,
    // 第一章debug:
    debug: false,
    // deepdebug: true,
    deepdebug: false,
    debug3: false,

    pressEnter: false, // 用户是否按下enter和场景交互
    holdedItem: null, // @str, 当前所持的道具
    neverClickItem: true, //用户从未点击过背包
    getNewItem: null, // @str, 当前获得的道具。
    canEmitPuzzle: true, // 当前是否已经发射谜题,发射成功后置为true,防止连续按键导致出现多个谜题

    // level1 info:
    foundEye: false, // 是否找到视觉芯片
    foundBattery: false,
    getpwd: false,
    seenComputer: false,
    getTimeMachine: false,
    getGuider: false,

    //level2 INFO:
    eagleOn: false, // 开启鹰眼模式（门可见）
    trashNum: 0,
    putTooKitIntoTank: false,
    turnOffPC: false,

    putSeed: false,
    putKela: false,

    installedGuider: false,
    installedKernel: false,
};