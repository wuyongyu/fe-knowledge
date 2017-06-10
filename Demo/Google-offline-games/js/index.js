var canvas = document.createElement('canvas'),
    a = document.getElementById('runner-container');
canvas.id = 'c';
canvas.width = 600;
canvas.height = 150;
a.appendChild(canvas);

var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d');


//定义坐标，在雪碧图中的位置
var spriteDefinition = {
    CACTUS_LARGE: {
        x: 332,
        y: 2
    },
    //大仙人掌
    CACTUS_SMALL: {
        x: 228,
        y: 2
    },
    //小仙人掌
    CLOUD: {
        x: 86,
        y: 2
    },
    //云
    HORIZON: {
        x: 2,
        y: 54
    },
    //地面在雪碧图中的位置
    MOON: {
        x: 484,
        y: 2
    },
    //月亮
    PTERODACTYL: {
        x: 134,
        y: 2
    },
    //翼龙
    RESTART: {
        x: 2,
        y: 2
    },
    //重新开始按钮
    TEXT_SPRITE: {
        x: 655,
        y: 2
    },
    //分数
    TREX: {
        x: 848,
        y: 2
    },
    //霸王龙
    STAR: {
        x: 645,
        y: 2
    }
    //星星
},
    FPS = 60,
    DEFAULT_WIDTH = 600,
    c = document.getElementById('c'),
    ctx = c.getContext('2d'),
    imgSprite = document.getElementById('sprite');

// 一、1.1 地面绘制通过HorizonLine构造函数完成
function HorizonLine(canvas, spritePos) {
    this.spritePos = spritePos;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sourceDimensions = {};
    this.dimensions = HorizonLine.dimensions;
    this.sourceXPos = [this.spritePos.x, this.spritePos.x + this.dimensions.WIDTH]; //在雪碧图中坐标为(x:2,y:54)处的地形
    this.xPos = []; // 地面在画布中的x坐标
    this.yPos = 0; // 地面在画布中的y坐标
    this.bumpThreshold = 0.5; // 随机地形系数

    this.setSourceDimesions();
    this.draw();
}

// 1.2 HorizonLine定义属性
HorizonLine.dimensions = {
    WIDTH: 600, // 宽600
    HEIGHT: 12, // 高12像素
    YPOS: 127 // 在画布中的位置
};

// 1.3 HorizonLine原型链中的方法
HorizonLine.prototype = {
    setSourceDimesions: function() {
        for (var dimension in HorizonLine.dimensions) {
            this.sourceDimensions[dimension] = HorizonLine.dimensions[dimension];
            this.dimensions[dimension] = HorizonLine.dimensions[dimension];
        }
        // 地面在画布上的位置
        this.xPos = [0, HorizonLine.dimensions.WIDTH]; // 0,600
        this.yPos = HorizonLine.dimensions.YPOS; // 127
    },
    // 随机地形
    getRandomType: function() {
        // 返回第一段地形或者第二段地形
        return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
    },
    draw: function() {
        // 使用9个参数的drawImage方法
        this.ctx.drawImage(imgSprite,
            this.sourceXPos[0], this.spritePos.y,
            this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
            this.xPos[0], this.yPos,
            this.dimensions.WIDTH, this.dimensions.HEIGHT);

        this.ctx.drawImage(imgSprite,
            this.sourceXPos[1], this.spritePos.y,
            this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
            this.xPos[1], this.yPos,
            this.dimensions.WIDTH, this.dimensions.HEIGHT);

    },
    updateXPos: function(pos, increment) {
        var line1 = pos, line2 = pos === 0 ? 1 : 0;

        this.xPos[line1] -= increment;
        this.xPos[line2] = this.xPos[line1] + this.dimensions.WIDTH;
        // 若第一段地面完全移出canvas外
        if (this.xPos[line1] <= -this.dimensions.WIDTH) {
            // 则将其移动至canvas外右侧
            this.xPos[line1] += this.dimensions.WIDTH * 2;
            // 同时将第二段地面移动至canvas内
            this.xPos[line2] = this.xPos[line1] - this.dimensions.WIDTH;
            // 选择随机地形
            this.sourceXPos[line1] = this.getRandomType() + this.spritePos.x;
        }
    },
    update: function(deltaTime, speed) {
        var increment = Math.floor(speed * (FPS / 1000) * deltaTime);
        // 交换地面一和二
        if (this.xPos[0] <= 0) {
            this.updateXPos(0, increment);
        } else {
            this.updateXPos(1, increment);
        }
        this.draw();
    },
    reset: function() {
        this.xPos[0] = 0;
        this.xPos[1] = HorizonLine.dimensions.WIDTH;
    }
};

// 二、2.1 云朵的绘制通过Cloud构造函数完成
function Cloud(canvas, spritePos, containerWidth) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.spritePos = spritePos;
    this.containerWidth = containerWidth;
    this.xPos = containerWidth; // 云朵初始x坐标在屏幕外，600
    this.yPos = 0; // 云朵初始高度
    this.remove = false; // 是否移除
    // 云朵间隙400~100
    this.cloudGap = getRandomNum(Cloud.config.MIN_CLOUD_GAP, Cloud.config.MAX_CLOUD_GAP);
    this.init();
}

// 2.2 Cloud定义属性
Cloud.config = {
    HEIGHT: 14, // 云朵sprite的高度
    MAX_CLOUD_GAP: 400, // 两朵云之间的最大间隙
    MAX_SKY_LEVEL: 30, // 云朵的最大高度
    MIN_CLOUD_GAP: 100, // 两朵云之间的最小间隙
    MIN_SKY_LEVEL: 71,  // 云朵的最小高度
    WIDTH: 46  // 云朵sprite的宽度
};

// 2.3 Cloud原型链的主要的逻辑代码
Cloud.prototype = {
    init: function() {
        // 设置云朵的随机高度为30~71
        this.yPos = getRandomNum(Cloud.config.MAX_SKY_LEVEL, Cloud.config.MIN_SKY_LEVEL);
        this.draw();
    },
    draw: function() {
        this.ctx.save();
        var sourceWidth = Cloud.config.WIDTH,
            sourceHeight = Cloud.config.HEIGHT;

        this.ctx.drawImage(imgSprite,
            this.spritePos.x, this.spritePos.y,
            sourceWidth, sourceHeight,
            this.xPos, this.yPos,
            sourceWidth, sourceHeight);

        this.ctx.restore();
    },
    // 添加云朵并控制其移动
    update: function(speed) {
        // 仅绘制符合条件的云朵
        if (!this.remove) {
            //向左移动
            this.xPos -= Math.ceil(speed);
            this.draw();

            if (!this.isVisible()) {
                this.remove = true;
            }
        }
    },
    //判断是否移出屏幕外
    isVisible: function() {
        return this.xPos + Cloud.config.WIDTH > 0;
    }
};

// 2.4 Cloud生产随机数
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 三、3.1 昼夜交替的绘制通过NightMode构造函数完成
function NightMode(canvas, spritePos, containerWidth) {
    this.spritePos = spritePos;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.containerWidth = containerWidth;
    this.xPos = containerWidth - 50; // 月亮的x坐标
    this.yPos = 30; // 月亮的y坐标
    this.currentPhase = 0;
    this.opacity = 0;
    this.stars = []; // 用于存储星星
    this.drawStars = false;
    this.placeStars(); // 放置星星
}

// 3.2 NightMode定义属性
NightMode.config = {
    FADE_SPEED: 0.035, // 淡入淡出速度
    HEIGHT: 40, // 月亮高度
    MOON_SPEED: 0.25, // 月亮移动速度
    NUM_STARS: 2, // 星星数量
    STAR_SIZE: 9, // 星星宽度
    STAR_SPEED: 0.3, // 星星速度
    STAR_MAX_Y: 70, // 星星在画布上出现的位置
    WIDTH: 20 // 半个月亮宽度
};
NightMode.phases = [140, 120, 100, 60, 40, 20, 0];

// 3.3 NightMode原型链中的方法
NightMode.prototype = {
    update: function(activated) {
        // 若夜晚模式处于激活状态且opacity为0时
        // 对月亮周期进行更新
        if (activated && this.opacity == 0) {
            this.currentPhase++;
            if (this.currentPhase >= NightMode.phases.length) {
                this.currentPhase = 0;
            }
        }

        // 淡入淡出
        if (activated && (this.opacity < 1 || this.opacity == 0)) {
            this.opacity += NightMode.config.FADE_SPEED;
        } else if (this.opacity > 0) {
            this.opacity -= NightMode.config.FADE_SPEED;
        }

        // 当opacity大于0时移动月亮位置
        if (this.opacity > 0) {
            this.xPos = this.updateXPos(this.xPos, NightMode.config.MOON_SPEED);

            //移动星星
            if (this.drawStars) {
                for (var i = 0; i < NightMode.config.NUM_STARS; i++) {
                    this.stars[i].x = this.updateXPos(this.stars[i].x, NightMode.config.STAR_SPEED);
                }
            }
            this.draw();
        } else {
            this.opacity = 0;
            this.placeStars();
        }
        this.drawStars = true;
    },
    updateXPos: function(currentPos, speed) {
        if (currentPos < -NightMode.config.WIDTH) {
            currentPos = this.containerWidth;
        } else {
            currentPos -= speed;
        }
        return currentPos;
    },
    draw: function() {
        // 周期为3时画满月
        var moonSourceWidth = this.currentPhase == 3 ? NightMode.config.WIDTH * 2 :
            NightMode.config.WIDTH;
        var moonSourceHeight = NightMode.config.HEIGHT;
        // 从雪碧图上获取月亮正确的形状
        var moonSourceX = this.spritePos.x + NightMode.phases[this.currentPhase];
        var moonOutputWidth = moonSourceWidth;
        var starSize = NightMode.config.STAR_SIZE;
        var starSourceX = spriteDefinition.STAR.x;

        this.ctx.save();
        // 画布透明度也随之变化
        this.ctx.globalAlpha = this.opacity;

        if (this.drawStars) {
            for (var i = 0; i < NightMode.config.NUM_STARS; i++) {
                this.ctx.drawImage(imgSprite,
                    starSourceX, this.stars[i].sourceY,
                    starSize, starSize,
                    Math.round(this.stars[i].x), this.stars[i].y,
                    NightMode.config.STAR_SIZE, NightMode.config.STAR_SIZE);
            }
        }

        this.ctx.drawImage(imgSprite,
            moonSourceX, this.spritePos.y,
            moonSourceWidth, moonSourceHeight,
            Math.round(this.xPos), this.yPos,
            moonOutputWidth, NightMode.config.HEIGHT);

        this.ctx.globalAlpha = 1;
        this.ctx.restore();
    },
    placeStars: function() {
        // 将画布分为若干组
        var segmentSize = Math.round(this.containerWidth / NightMode.config.NUM_STARS);
        for (var i = 0; i < NightMode.config.NUM_STARS; i++) {
            this.stars[i] = {};
            // 每组星星位置随机
            this.stars[i].x = getRandomNum(segmentSize * i, segmentSize * (i + 1));
            this.stars[i].y = getRandomNum(0, NightMode.config.STAR_MAX_Y);
            this.stars[i].sourceY = spriteDefinition.STAR.y + NightMode.config.STAR_SIZE * i;
        }
    },
    // invert:function(deltaTime) {
    //     this.update(NightMode.inverted);
    //
    //     //黑夜持续时间5秒
    //     if(NightMode.invertTimer > NightMode.INVERT_FADE_DURATION) {
    //         NightMode.invertTimer = 0;
    //         NightMode.invertTrigger = false;
    //         NightMode.inverted = document.body.classList.toggle('inverted',NightMode.invertTrigger);
    //     } else if(NightMode.invertTimer) {
    //         NightMode.invertTimer += deltaTime;
    //     } else {
    //         //每500帧触发黑夜，这里只是为了模拟效果，完整游戏中是每700米触发一次黑夜
    //         NightMode.invertTrigger = !(gameFrame % 500);
    //         if(NightMode.invertTrigger && NightMode.invertTimer === 0) {
    //             NightMode.invertTimer += deltaTime;
    //             NightMode.inverted = document.body.classList.toggle('inverted',NightMode.invertTrigger);
    //         }
    //     }
    // },
    reset: function() {
        this.currentPhase = 0;
        this.opacity = 0;
        this.update(false);
    }
};

// 四、4.1 障碍物的绘制通过Obstacle构造函数完成
/*
   * 障碍物Obstacle构造函数
   * @param canvas
   * @param type 障碍物的类型
   * @param spriteImgPos 雪碧图坐标
   * @param dimensions 屏幕尺寸
   * @param gapCoefficient 障碍物间隙
   * @param speed 障碍物移动速度
   * @param opt_xOffset 障碍物水平偏移量
 */
function Obstacle(ctx, type, spriteImgPos, dimensions, gapCoefficient, speed, opt_xOffset) {
    this.ctx = ctx;
    this.spritePos = spriteImgPos;
    this.typeConfig = type; // 障碍物类型(仙人掌、翼龙)
    this.gapCoefficient = gapCoefficient;
    this.size = getRandomNum(1, Obstacle.MAX_OBSTACLE_LENGTH); // 每个障碍物的数量(1~3)
    this.dimensions = dimensions;
    this.remove = false; // 表示该障碍物是否可以被移除
    this.xPos = dimensions.WIDTH + (opt_xOffset || 0); // 水平坐标
    this.yPos = 0;
    this.width = 0;
    this.collisionBoxes = [];
    this.gap = 0;
    this.speedOffset = 0; // 速度修正

    this.currentFrame = 0; // 障碍物的动画帧
    this.timer = 0; //动画帧切换的计时器

    this.init(speed);
}

// 4.2 Obstacle定义属性
Obstacle.MAX_GAP_COEFFICIENT = 1.5; // 障碍物最大间距系数
Obstacle.MAX_OBSTACLE_LENGTH = 3; // 每组障碍物的最大数量
Obstacle.types = [
    {
        type: 'CACTUS_SMALL', // 小仙人掌
        width: 17,
        height: 35,
        yPos: 105, // 在画布上的y坐标
        multipleSpeed: 4,
        minGap: 120, // 最小间距
        minSpeed: 0, // 最低速度
        collisionBoxes: [
            new CollisionBox(0,7,5,27),
            new CollisionBox(4,0,6,34),
            new CollisionBox(10,4,7,14)
        ]
    },
    {
        type: 'CACTUS_LARGE',  // 大仙人掌
        width: 25,
        height: 50,
        yPos: 90,
        multipleSpeed: 7,
        minGap: 120,
        minSpeed: 0,
        collisionBoxes: [
            new CollisionBox(0,12,7,38),
            new CollisionBox(8,0,7,49),
            new CollisionBox(13,10,10,38)
        ]
    },
    {
        type: 'PTERODACTYL', // 翼龙
        width: 46,
        height: 40,
        yPos: [100, 75, 50],
        // Variable height. 高、中、低三种高度
        yPosMobile: [100, 50],
        // Variable height mobile.
        multipleSpeed: 999,
        minSpeed: 8.5,
        minGap: 150,
        collisionBoxes: [
            new CollisionBox(15,15,16,5),
            new CollisionBox(18,21,24,6),
            new CollisionBox(2,14,4,3),
            new CollisionBox(6,10,4,7),
            new CollisionBox(10,8,6,9)
        ],
        numFrames: 2,  // 有两个动画帧
        frameRate: 1000 / 6, // 动画帧的切换速率，这里为一秒6帧
        speedOffset: .8 // 速度修正
    }
];

// 4.3 Obstacle原型链中的实例方法
Obstacle.prototype = {
    init: function(speed) {
        this.cloneCollisionBoxes();
        // 若multipleSpeed大于移动速度，则只出现一个障碍物
        if(this.size > 1 && this.typeConfig.multipleSpeed > speed) {
            this.size = 1;
        }
        // 障碍物的总宽度等于单个障碍物的宽度乘以个数
        this.width = this.typeConfig.width * this.size;
        // 若障碍物的纵坐标是一个数组
        // 则随机选取一个
        if(Array.isArray(this.typeConfig.yPos)) {
            var yPosConfig = this.typeConfig.yPos;
            this.yPos = yPosConfig[getRandomNum(0, yPosConfig.length - 1)];
        } else {
            this.yPos = this.typeConfig.yPos;
        }

        this.draw();
        // 只针对仙人掌
        if(this.size > 1) {
            this.collisionBoxes[1].width = this.width - this.collisionBoxes[0].width - this.collisionBoxes[2].width;

            this.collisionBoxes[2].x = this.width - this.collisionBoxes[2].width;
        }
        // 对翼龙的速度进行修正，让它看起来有的飞得快一些，有些飞得慢一些
        if(this.typeConfig.speedOffset) {
            this.speedOffset = Math.random() > 0.5 ? this.typeConfig.speedOffset : -this.typeConfig.speedOffset;
        }
        // 障碍物之间的间隙，与游戏速度有关
        this.gap = this.getGap(this.gapCoefficient, speed);
    },
    draw: function() {
        // 障碍物宽高
        var sourceWidth = this.typeConfig.width;
        var sourceHeight = this.typeConfig.height;
        // 根据障碍物数量计算障碍物在雪碧图上的x坐标
        // this.size的取值范围是1~3
        var sourceX = (sourceWidth * this.size) * (0.5 * (this.size - 1)) +
            this.spritePos.x;

        // 如果当前动画帧大于0，说明障碍物类型是翼龙
        // 更新翼龙的雪碧图x坐标使其匹配第二帧动画
        if(this.currentFrame > 0) {
            sourceX += sourceWidth * this.currentFrame;
        }
        this.ctx.drawImage(imgSprite,
            sourceX, this.spritePos.y,
            sourceWidth * this.size, sourceHeight,
            this.xPos, this.yPos,
            sourceWidth * this.size, sourceHeight);
    },
    // 单个障碍物的移动
    update: function(deltaTime, speed) {
        // 如果障碍物还没有移出屏幕外
        if (!this.remove) {
            // 如果有速度修正则修正速度
            if (this.typeConfig.speedOffset) {
                speed += this.speedOffset;
            }
            // 更新x坐标
            this.xPos -= Math.floor((speed * FPS / 1000) * deltaTime);

            // Update frame
            if (this.typeConfig.numFrames) {
                this.timer += deltaTime;
                if (this.timer >= this.typeConfig.frameRate) {
                    // 在两个动画帧之间来回切换以达到动画效果
                    this.currentFrame =
                        this.currentFrame == this.typeConfig.numFrames - 1 ?
                            0 : this.currentFrame + 1;
                    this.timer = 0;
                }
            }
            this.draw();

            if (!this.isVisible()) {
                this.remove = true;
            }
        }
    },
    // 障碍物之间的间隔，gapCoefficient为间隔系数
    getGap: function(gapCoefficient, speed) {
        var minGap = Math.round(this.width * speed +
            this.typeConfig.minGap * gapCoefficient);
        var maxGap = Math.round(minGap * Obstacle.MAX_GAP_COEFFICIENT);
        return getRandomNum(minGap, maxGap);
    },
    // 判断障碍物是否移出屏幕外
    isVisible: function() {
        return this.xPos + this.width > 0;
    },
    cloneCollisionBoxes: function() {
        var collisionBoxes = this.typeConfig.collisionBoxes;

        for (var i = collisionBoxes.length - 1; i >= 0; i--) {
            this.collisionBoxes[i] = new CollisionBox(collisionBoxes[i].x,
                collisionBoxes[i].y,collisionBoxes[i].width,
                collisionBoxes[i].height);
        }
    }
};

// 五、5.1 恐龙的绘制通过Trex构造函数完成
function Trex(canvas, spritePos) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.spritePos = spritePos; // 在雪碧图中的位置
    this.xPos = 0; // 在画布中的x坐标
    this.yPos = 0; // 在画布中的y坐标
    this.groundYPos = 0; // 初始化地面的高度
    this.currentFrame = 0; // 初始化动画帧
    this.currentAnimFrames = []; // 记录当前状态的动画帧
    this.blinkDelay = 0; // 眨眼延迟(随机)
    this.animStartTime = 0; // 动画开始的时间
    this.timer = 0; // 计时器
    this.msPerFrame = 1000 / FPS; // 默认帧率
    this.config = Trex.config; // 拷贝一个配置的副本方便以后使用
    this.status = Trex.status.WAITING; // 初始化默认状态为待机状态
    // 为各种状态建立标识
    this.jumping = false; // 角色是否处于跳跃中
    this.ducking = false; // 角色是否处于闪避中
    this.jumpVelocity = 0;
    this.reachedMinHeight = false; // 是否到达最小跳跃高度
    this.speedDrop = false; // 是否加速降落
    this.jumpCount = 0; // 跳跃次数
    this.jumpspotX = 0; // 空降着陆点

    this.init();
}

// 5.2 Trex定义属性
Trex.config = {
    DROP_VELOCITY: -5, // 下落速度
    GRAVITY: 0.6, // 重力
    HEIGHT: 47, // 站立时高度
    HEIGHT_DUCK: 25, // 闪躲时高度
    INIITAL_JUMP_VELOCITY: -10, // 初始起跳速度
    INTRO_DURATION: 1500,
    MAX_JUMP_HEIGHT: 30, // 最大起跳高度
    MIN_JUMP_HEIGHT: 30, // 最小起跳高度
    SPEED_DROP_COEFFICIENT: 3,
    SPRITE_WIDTH: 262, // 雪碧图霸王龙部分的宽度(不包含闪避动作)
    START_X_POS: 50, // 在画布的起始位置
    WIDTH: 44, // 站立时宽度
    WIDTH_DUCK: 59 // 闪避时宽度
};
// 恐龙状态
Trex.status = {
    CRASHED: 'CRASHED', // 碰到障碍物
    DUCKING: 'DUCKING', // 闪避
    JUMPING: 'JUMPING', // 跳跃
    RUNNING: 'RUNNING', // 跑动
    WAITING: 'WAITING' // 等待
};
Trex.BLINK_TIMING = 3000; //眨眼间隔
Trex.collisionBoxes = {
    DUCKING: [
        new CollisionBox(1,18,55,25)
    ],
    RUNNING: [
        new CollisionBox(22,0,17,16),
        new CollisionBox(1,18,30,9),
        new CollisionBox(10,35,14,8),
        new CollisionBox(1,24,29,5),
        new CollisionBox(5,30,21,4),
        new CollisionBox(9,34,15,4)
    ]
};
// 元数据(metadata)，记录各个状态的动画帧和帧率
Trex.animFrames = {
    // 待机状态
    WAITING: {
        frames: [44, 0], // 动画帧x坐标在44和0之间切换，由于在雪碧图中的y坐标是0所以不用记录
        msPerFrame: 1000 / 3  // 一秒3帧
    },
    RUNNING: {
        frames: [88, 132],
        msPerFrame: 1000 / 12
    },
    CRASHED: {
        frames: [220],
        msPerFrame: 1000 / 60
    },
    JUMPING: {
        frames: [0],
        msPerFrame: 1000 / 60
    },
    DUCKING: {
        frames: [262, 321],
        msPerFrame: 1000 / 8
    }
};

// 5.3 Trex原型链中的方法
Trex.prototype = {
    init: function() {
        this.blinkDelay = this.setBlinkDelay();
        this.groundYPos = Runner.defaultDimensions.HEIGHT - this.config.HEIGHT -
            Runner.config.BOTTOM_PAD;
        this.yPos = this.groundYPos;

        this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT; // 计算出最小起跳高度
        this.draw(0, 0);
        this.update(0, Trex.status.WAITING);
    },
    setJumpVelocity: function(setting) {
        this.config.INIITAL_JUMP_VELOCITY = -setting;
        this.config.DROP_VELOCITY = -setting / 2;
    },
    update: function(deltaTime, opt_status) {
        this.timer += deltaTime;
        if (opt_status) {
            this.status = opt_status;
            this.currentFrame = 0;
            // 得到对应状态的帧率 e.g. WAITING 1000ms / 3fps = 333ms/fps
            this.msPerFrame = Trex.animFrames[opt_status].msPerFrame;
            // 对应状态的动画帧 e.g. WAITING [44,0]
            this.currentAnimFrames = Trex.animFrames[opt_status].frames;

            if (opt_status == Trex.status.WAITING) {
                // 开始计时
                this.animStartTime = getTimeStamp();
                // 设置延时
                this.setBlinkDelay();
            }
        }
        // 计时器超过一帧的运行时间，切换到下一帧
        // 恐龙向前移动50像素
        if (this.playingIntro && this.xPos < this.config.START_X_POS) {
            this.xPos += Math.round((this.config.START_X_POS /
                this.config.INTRO_DURATION) * deltaTime);
        }
        // 待机状态
        if (this.status == Trex.status.WAITING) {
            // 执行眨眼动作
            this.blink(getTimeStamp());
        } else {
            this.draw(this.currentAnimFrames[this.currentFrame], 0);
        }
        // 计时器超过一帧的运行时间，切换到下一帧
        if (this.timer >= this.msPerFrame) {
            this.currentFrame = this.currentFrame ==
            this.currentAnimFrames.length - 1 ? 0 : this.currentFrame + 1;
            this.timer = 0; // 重置计时器
        }

        if (this.speedDrop && this.yPos == this.groundYPos) {
            this.speedDrop = false;
            this.setDuck(true);
        }
    },
    setBlinkDelay: function() {
        // 设置随机眨眼间隔时间
        this.blinkDelay = Math.ceil(Math.random() * Trex.BLINK_TIMING);
    },
    blink: function(time) {
        var deltaTime = time - this.animStartTime;

        if (deltaTime >= this.blinkDelay) {
            this.draw(this.currentAnimFrames[this.currentFrame], 0);

            if (this.currentFrame == 1) {
                // 0闭眼 1睁眼
                //设置新的眨眼间隔时间
                this.setBlinkDelay();
                this.animStartTime = time;
            }
        }
    },
    startJump: function(speed) {
        if (!this.jumping) {
            // 切换到jump状态
            this.update(0, Trex.status.JUMPING);
            // 设置跳跃速度
            this.jumpVelocity = this.config.INIITAL_JUMP_VELOCITY - (speed / 10);
            this.jumping = true;
            this.reachedMinHeight = false;
            this.speedDrop = false;
        }
    },
    endJump: function() {
        if (this.reachedMinHeight && this.jumpVelocity < this.config.DROP_VELOCITY) {
            this.jumpVelocity = this.config.DROP_VELOCITY;
        }
    },
    updateJump: function(deltaTime, speed) {
        // 帧切换速率
        var msPerFrame = Trex.animFrames[this.status].msPerFrame;
        // 经过的帧数
        var framesElapsed = deltaTime / msPerFrame;
        // 更新y轴坐标
        if (this.speedDrop) {
            // SPEED_DROP_COEFFICIENT为加速倍数，初始设定为3
            this.yPos += Math.round(this.jumpVelocity *
                this.config.SPEED_DROP_COEFFICIENT * framesElapsed);
        } else {
            this.yPos += Math.round(this.jumpVelocity * framesElapsed);
        }
        // 由于速度受重力影响，需要对速度进行修正
        this.jumpVelocity += this.config.GRAVITY * framesElapsed;
        // 达到最小跳跃高度
        // speedDrop也能触发reachedMinHeight
        if (this.yPos < this.minJumpHeight || this.speedDrop) {
            this.reachedMinHeight = true;
        }
        // 达到最大高度后停止跳跃
        // speedDrop也能触发endJump
        if (this.yPos < this.config.MAX_JUMP_HEIGHT || this.speedDrop) {
            this.endJump();
        }

        if (this.yPos > this.groundYPos) {
            this.reset();
            this.jumpCount++;
        }

        this.update(deltaTime);
    },
    setSpeedDrop: function() {
        this.speedDrop = true;
        this.jumpVelocity = 1; // 将速度设置为1，正方向(向下为正方向)
    },
    setDuck: function(isDucking) {
        if (isDucking && this.status != Trex.status.DUCKING) {
            this.update(0, Trex.status.DUCKING);
            this.ducking = true;
        } else if (this.status == Trex.status.DUCKING) {
            this.update(0, Trex.status.RUNNING);
            this.ducking = false;
        }
    },
    draw: function(x, y) {
        var sourceX = x;
        var sourceY = y;
        var sourceWidth = this.ducking && this.status != Trex.status.CRASHED ?
            this.config.WIDTH_DUCK : this.config.WIDTH;
        var sourceHeight = this.config.HEIGHT;
        sourceX += this.spritePos.x;
        sourceY += this.spritePos.y;

        if (this.ducking && this.status != Trex.status.CRASHED) {
            this.ctx.drawImage(imgSprite, sourceX, sourceY,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH_DUCK, this.config.HEIGHT);
        } else {
            if (this.ducking && this.status == Trex.status.CRASHED) {
                this.xPos++;
            }

            this.ctx.drawImage(imgSprite, sourceX, sourceY,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH, this.config.HEIGHT);
        }
    },
    reset: function() {
        this.yPos = this.groundYPos;
        this.jumpVelocity = 0;
        this.jumping = false;
        this.ducking = false;
        this.update(0, Trex.status.RUNNING);
        this.midair = false;
        this.speedDrop = false;
        this.jumpCount = 0;
    }
};

// 六、6.1 逻辑控制通过Runner构造函数完成
function Runner(outerContainerId, opt_config) {
    if (Runner.instance_) {
        return Runner.instance_;
    }
    Runner.instance_ = this;
    //this.outerContainerEl = document.querySelector(outerContainerId);
    this.containerEl = null ;
    this.snackbarEl = null ;
    //this.detailsButton = this.outerContainerEl.querySelector('#details-button');
    this.config = opt_config || Runner.config;
    this.dimensions = Runner.defaultDimensions;
    this.canvas = null ;
    this.ctx = null ;

    this.tRex = null ;
    this.distanceMeter = null ;
    this.distanceRan = 0;
    this.highestScore = 0;

    this.time = 0;
    this.runningTime = 0;
    this.msPerFrame = 1000 / FPS;
    this.currentSpeed = this.config.SPEED;

    this.obstacles = [];
    //障碍物

    this.started = false;
    this.activated = false;
    this.crashed = false;
    this.paused = false;
    this.inverted = false;
    this.invertTimer = 0;
    this.resizeTimerId_ = null ;

    this.playCount = 0;

    // Sound FX.
    this.audioBuffer = null ;
    this.soundFx = {};

    // Global web audio context for playing sounds.
    this.audioContext = null ;

    // Images.
    this.images = {};
    this.imagesLoaded = 0;

    this.loadImages();
}

// 6.2 Runner定义属性
Runner.config = {
    ACCELERATION: 0.001,
    BG_CLOUD_SPEED: 0.2,
    BOTTOM_PAD: 10,
    CLEAR_TIME: 3000,
    CLOUD_FREQUENCY: 0.5,
    GAMEOVER_CLEAR_TIME: 750,
    GAP_COEFFICIENT: 0.6,
    GRAVITY: 0.6,
    INITIAL_JUMP_VELOCITY: 12,
    INVERT_FADE_DURATION: 10000,
    //夜晚持续时间
    INVERT_DISTANCE: 500,
    //每500距离进行昼夜交替
    MAX_CLOUDS: 6,
    //云最大数量
    MAX_OBSTACLE_LENGTH: 3,
    MAX_OBSTACLE_DUPLICATION: 2,
    MAX_SPEED: 13,
    MIN_JUMP_HEIGHT: 35,
    MOBILE_SPEED_COEFFICIENT: 1.2,
    RESOURCE_TEMPLATE_ID: 'audio-resources',
    SPEED: 6,
    SPEED_DROP_COEFFICIENT: 3
};
Runner.defaultDimensions = {
    HEIGHT: 150,
    WIDTH: 600
};
Runner.classes = {
    CANVAS: 'runner-canvas',
    CONTAINER: 'runner-container',
    CRASHED: 'crashed',
    ICON: 'icon-offline',
    INVERTED: 'inverted',
    SNACKBAR: 'snackbar',
    SNACKBAR_SHOW: 'snackbar-show',
    TOUCH_CONTROLLER: 'controller'
};
Runner.sounds = {
    BUTTON_PRESS: 'offline-sound-press',
    HIT: 'offline-sound-hit',
    SCORE: 'offline-sound-reached'
};
Runner.keycodes = {
    JUMP: {
        '38': 1,
        '32': 1
    },
    // Up, spacebar
    DUCK: {
        '40': 1
    },
    // Down
    RESTART: {
        '13': 1
    }// Enter
};
Runner.events = {
    ANIM_END: 'webkitAnimationEnd',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup',
    RESIZE: 'resize',
    TOUCHEND: 'touchend',
    TOUCHSTART: 'touchstart',
    VISIBILITY: 'visibilitychange',
    BLUR: 'blur',
    FOCUS: 'focus',
    LOAD: 'load'
};

// 6.3 Runner原型链中的方法
Runner.prototype = {
    loadImages: function() {
        this.spriteDef = spriteDefinition;
        this.init();
    },
    loadSounds: function() {
        this.audioContext = new AudioContext();
    },
    setSpeed: function(opt_speed) {
        if (opt_speed)
            this.currentSpeed = opt_speed;
    },
    init: function() {
        this.setSpeed();
        this.canvas = c;
        this.ctx = ctx;
        this.ctx.fillStyle = '#f7f7f7';
        this.ctx.fill();

        this.horizon = new Horizon(this.canvas,this.spriteDef,this.dimensions,
            this.config.GAP_COEFFICIENT);

        this.distanceMeter = new DistanceMeter(this.canvas,this.spriteDef.TEXT_SPRITE,this.dimensions.WIDTH);

        this.tRex = new Trex(this.canvas,this.spriteDef.TREX);

        this.startListening();
        this.update();
    },
    //开场动画
    playIntro: function() {
        if (!this.started && !this.crashed) {
            this.playingIntro = true;
            this.tRex.playingIntro = true;

            var keyframes = '@-webkit-keyframes intro { ' +
                'from { width:' + Trex.config.WIDTH + 'px }' +
                'to { width: ' + this.dimensions.WIDTH + 'px }' +
                '}';
            document.styleSheets[0].insertRule(keyframes, 0);
            this.containerEl = document.getElementById('runner-container');
            this.containerEl.addEventListener('webkitAnimationEnd',
                this.startGame.bind(this));

            this.containerEl.style.webkitAnimation = 'intro .4s ease-out 1 both';
            this.containerEl.style.width = this.dimensions.WIDTH + 'px';

            this.activated = true;
            this.started = true;
        } else if (this.crashed) {
            this.restart();
        }
    },
    startGame: function() {
        this.runningTime = 0;
        this.playingIntro = false;
        this.tRex.playingIntro = false;
        this.containerEl.style.webkitAnimation = '';
        this.playCount++;

        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        window.addEventListener('blur', this.onVisibilityChange.bind(this));
        window.addEventListener('focus', this.onVisibilityChange.bind(this));
    },
    clearCanvas: function() {
        this.ctx.clearRect(0, 0, this.dimensions.WIDTH, this.dimensions.HEIGHT);
    },
    //todo
    update: function() {
        this.drawPending = false;

        var now = getTimeStamp();
        var deltaTime = now - (this.time || now);
        this.time = now;

        if (this.activated) {

            this.clearCanvas();

            if (this.tRex.jumping) {
                this.tRex.updateJump(deltaTime);
            }

            this.runningTime += deltaTime;
            var hasObstacles = this.runningTime > this.config.CLEAR_TIME;
            //如果是第一次跳跃并且没有播放开场动画，则播放开场动画
            if (this.tRex.jumpCount == 1 && !this.playingIntro) {
                this.playIntro();
            }

            if (this.playingIntro) {
                this.horizon.update(0, this.currentSpeed, hasObstacles);
            } else {
                deltaTime = !this.started ? 0 : deltaTime;
                this.horizon.update(deltaTime, this.currentSpeed, hasObstacles,
                    this.inverted);
            }
            var collision = hasObstacles &&
                checkForCollision(this.horizon.obstacles[0], this.tRex);

            if (!collision) {
                this.distanceRan += this.currentSpeed * deltaTime / this.msPerFrame;

                if (this.currentSpeed < this.config.MAX_SPEED) {
                    this.currentSpeed += this.config.ACCELERATION;
                }
            } else {
                this.gameOver();
            }

            var playAchievementSound = this.distanceMeter.update(deltaTime,
                Math.ceil(this.distanceRan));

            if (playAchievementSound) {
                this.playSound(this.soundFx.SCORE);
            }
            //若夜晚持续时间大于设定值则变为白天
            if (this.invertTimer > this.config.INVERT_FADE_DURATION) {
                this.invertTimer = 0;
                this.invertTrigger = false;
                this.invert();
            } else if (this.invertTimer) {
                this.invertTimer += deltaTime;
            } else {
                var actualDistance =
                    this.distanceMeter.getActualDistance(Math.ceil(this.distanceRan));

                if (actualDistance > 0) {
                    this.invertTrigger = !(actualDistance %
                    this.config.INVERT_DISTANCE);

                    if (this.invertTrigger && this.invertTimer === 0) {
                        this.invertTimer += deltaTime;
                        this.invert();
                    }
                }
            }
        }
        if (!this.crashed) {
            this.tRex.update(deltaTime);
            this.raq();
        }
    },
    handleEvent: function(e) {
        return (function(evtType, events) {
            switch (evtType) {
                case events.KEYDOWN:
                case events.TOUCHSTART:
                case events.MOUSEDOWN:
                    this.onKeyDown(e);
                    break;
                case events.KEYUP:
                case events.TOUCHEND:
                case events.MOUSEUP:
                    this.onKeyUp(e);
                    break;
            }
        }
            .bind(this))(e.type, Runner.events);
    },
    startListening: function() {
        document.addEventListener(Runner.events.KEYDOWN, this);
        document.addEventListener(Runner.events.KEYUP, this);
        document.addEventListener(Runner.events.MOUSEDOWN, this);
        document.addEventListener(Runner.events.MOUSEUP, this);
    },
    stopListening: function() {
        document.removeEventListener(Runner.events.KEYDOWN, this);
        document.removeEventListener(Runner.events.KEYUP, this);
        document.removeEventListener(Runner.events.MOUSEDOWN, this);
        document.removeEventListener(Runner.events.MOUSEUP, this);
    },
    onKeyDown: function(e) {

        if (e.target != this.detailsButton) {
            if (!this.crashed && Runner.keycodes.JUMP[e.keyCode]) {
                e.preventDefault();
                if (!this.activated) {
                    this.loadSounds();
                    this.activated = true;
                }
                if (!this.tRex.jumping && !this.tRex.ducking) {
                    this.tRex.startJump(this.currentSpeed);
                }
            }
        }
        if (this.activated && !this.crashed && Runner.keycodes.DUCK[e.keyCode]) {

            e.preventDefault();
            if (this.tRex.jumping) {
                this.tRex.setSpeedDrop(); // 加速下降
            } else if (!this.tRex.jumping && !this.tRex.ducking) {
                this.tRex.setDuck(true); //闪避
            }
        }
    },
    onKeyUp: function(e) {
        var keyCode = String(e.keyCode);
        var isjumpKey = Runner.keycodes.JUMP[keyCode] || e.type == Runner.events.TOUCHEND || e.type == Runner.events.MOUSEDOWN;

        if (this.isRunning() && isjumpKey) {
            e.preventDefault();
            this.tRex.endJump();
        } else if (Runner.keycodes.DUCK[keyCode]) {
            e.preventDefault();
            this.tRex.speedDrop = false;
            this.tRex.setDuck(false); // 取消闪避
        } else if (this.crashed) {
            e.preventDefault();
            // Check that enough time has elapsed before allowing jump key to restart.
            var deltaTime = getTimeStamp() - this.time;

            if (Runner.keycodes.RESTART[keyCode] || this.isLeftClickOnCanvas(e) ||
                (deltaTime >= this.config.GAMEOVER_CLEAR_TIME &&
                Runner.keycodes.JUMP[keyCode])) {
                e.preventDefault();
                this.restart();
            }
        } else if (this.paused && isjumpKey) {
            // Reset the jump state
            e.preventDefault();
            this.tRex.reset();
            this.play();
        }
    },
    isLeftClickOnCanvas: function(e) {
        return e.button != null  && e.button < 2 && e.type == Runner.events.MOUSEUP && e.target == this.canvas;
    },
    raq: function() {
        if (!this.drawPending) {
            this.drawPending = true;
            this.raqId = requestAnimationFrame(this.update.bind(this));
        }
    },
    isRunning: function() {
        return !!this.raqId;
    },
    gameOver: function() {
        //this.playSound(this.soundFx.HIT);
        //vibrate(200);

        this.stop();
        this.crashed = true;
        this.distanceMeter.acheivement = false;

        this.tRex.update(100, Trex.status.CRASHED);

        // Game over panel.
        if (!this.gameOverPanel) {
            this.gameOverPanel = new GameOverPanel(this.canvas,
                this.spriteDef.TEXT_SPRITE,this.spriteDef.RESTART,
                this.dimensions);
        } else {
            this.gameOverPanel.draw();
        }

        // Update the high score.
        if (this.distanceRan > this.highestScore) {
            this.highestScore = Math.ceil(this.distanceRan);
            this.distanceMeter.setHighScore(this.highestScore);
        }

        // Reset the time clock.
        this.time = getTimeStamp();
    },
    stop: function() {
        this.activated = false;
        this.paused = true;
        cancelAnimationFrame(this.raqId);
        this.raqId = 0;
    },
    play: function() {
        if (!this.crashed) {
            this.activated = true;
            this.paused = false;
            this.tRex.update(0, Trex.status.RUNNING);
            this.time = getTimeStamp();
            this.update();
        }
    },
    restart: function() {
        if (!this.raqId) {
            this.playCount++;
            this.runningTime = 0;
            this.activated = true;
            this.crashed = false;
            this.distanceRan = 0;
            this.setSpeed(this.config.SPEED);
            this.time = getTimeStamp();
            this.containerEl.classList.remove(Runner.classes.CRASHED);
            this.clearCanvas();
            this.distanceMeter.reset(this.highestScore);
            this.horizon.reset();
            this.tRex.reset();
            //this.playSound(this.soundFx.BUTTON_PRESS);
            this.invert(true);
            this.update();
        }
    },
    onVisibilityChange: function(e) {
        if (document.hidden || document.webkitHidden || e.type == 'blur' ||
            document.visibilityState != 'visible') {
            this.stop();
        } else if (!this.crashed) {
            this.tRex.reset();
            this.play();
        }
    },
    playSound: function(soundBuffer) {
        if (soundBuffer) {
            var sourceNode = this.audioContext.createBufferSource();
            sourceNode.buffer = soundBuffer;
            sourceNode.connect(this.audioContext.destination);
            sourceNode.start(0);
        }
    },
    invert: function(reset) {
        if (reset) {
            a.classList.toggle(Runner.classes.INVERTED, this.invertTrigger);
            //document.body.classList.toggle(Runner.classes.INVERTED,false);
            this.invertTimer = 0;
            this.inverted = false;
        } else {
            this.inverted = a.classList.toggle(Runner.classes.INVERTED, this.invertTrigger);

            //this.inverted = document.body.classList.toggle(Runner.classes.INVERTED,this.invertTrigger);
        }
    }
};

// 七、7.1 恐龙与障碍物之间的碰撞检测

/**
 * 碰撞检测盒子
 * @param x	{number} x坐标
 * @param y {number} y坐标
 * @param w	{number} 宽度
 * @param h	{number} 高度
 */
function CollisionBox(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

/**
 * 碰撞检测
 * @param tRexBox {Object} 霸王龙的碰撞盒子
 * @param obstacleBox {Object} 障碍物的碰撞盒子
 */
function boxCompare(tRexBox, obstacleBox) {
    var crashed = false;
    var tRexBoxX = tRexBox.x;
    var tRexBoxY = tRexBox.y;

    var obstacleBoxX = obstacleBox.x;
    var obstacleBoxY = obstacleBox.y;

    // Axis-Aligned Bounding Box method.
    if (tRexBox.x < obstacleBoxX + obstacleBox.width &&
        tRexBox.x + tRexBox.width > obstacleBoxX &&
        tRexBox.y < obstacleBox.y + obstacleBox.height &&
        tRexBox.height + tRexBox.y > obstacleBox.y) {
        crashed = true;
    }

    return crashed;
}

// 最后执行碰撞检测
function checkForCollision(obstacle, tRex, opt_canvasCtx) {
    var obstacleBoxXPos = Runner.defaultDimensions.WIDTH + obstacle.xPos;
    // 创建最外层的大盒子
    var tRexBox = new CollisionBox(
        tRex.xPos + 1,
        tRex.yPos + 1,
        tRex.config.WIDTH - 2,
        tRex.config.HEIGHT - 2);
    var obstacleBox = new CollisionBox(
        obstacle.xPos + 1,
        obstacle.yPos + 1,
        obstacle.typeConfig.width * obstacle.size - 2,
        obstacle.typeConfig.height - 2);

    if (opt_canvasCtx) {
        drawCollisionBoxes(opt_canvasCtx, tRexBox, obstacleBox);
    }
    if (boxCompare(tRexBox, obstacleBox)) {
        var collisionBoxes = obstacle.collisionBoxes;
        var tRexCollisionBoxes = tRex.ducking ?
            Trex.collisionBoxes.DUCKING : Trex.collisionBoxes.RUNNING;

        for (var t = 0; t < tRexCollisionBoxes.length; t++) {
            for (var i = 0; i < collisionBoxes.length; i++) {
                // 修正盒子
                var adjTrexBox =
                    createAdjustedCollisionBox(tRexCollisionBoxes[t], tRexBox);
                var adjObstacleBox =
                    createAdjustedCollisionBox(collisionBoxes[i], obstacleBox);
                var crashed = boxCompare(adjTrexBox, adjObstacleBox);

                // Draw boxes for debug.
                if (opt_canvasCtx) {
                    drawCollisionBoxes(opt_canvasCtx, adjTrexBox, adjObstacleBox);
                }

                if (crashed) {
                    return [adjTrexBox, adjObstacleBox];
                }
            }
        }
    }
    return false;
}

// 修正盒子，将相对坐标转为画布坐标
function createAdjustedCollisionBox(box, adjustment) {
    return new CollisionBox(
        box.x + adjustment.x,
        box.y + adjustment.y,
        box.width,
        box.height);
}

function drawCollisionBoxes(canvasCtx, tRexBox, obstacleBox) {
    canvasCtx.save();
    canvasCtx.lineWidth = 0.5;
    canvasCtx.strokeStyle = '#f00';
    canvasCtx.strokeRect(tRexBox.x + 0.5, tRexBox.y + 0.5, tRexBox.width, tRexBox.height);

    canvasCtx.strokeStyle = '#0f0';
    canvasCtx.strokeRect(obstacleBox.x + 0.5, obstacleBox.y + 0.5,
        obstacleBox.width, obstacleBox.height);
    canvasCtx.restore();
}

// 八、8.1 距离记录器通过DistanceMeter构造函数完成
/**
 * 距离记录器
 * @param {HTMLCanvasElement} canvas
 * @param {Object} spritePos 雪碧图上的坐标.
 * @param {number} canvasWidth
*/
function DistanceMeter(canvas, spritePos, canvasWidth) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = imgSprite;
    this.spritePos = spritePos;
    // 相对坐标
    this.x = 0;
    this.y = 5;
    // 最大分数
    this.currentDistance = 0;
    this.maxScore = 0;
    // 高分榜
    this.highScore = 0;
    this.container = null ;

    this.digits = [];
    // 是否进行闪动特效
    this.acheivement = false;
    this.defaultString = '';
    // 闪动特效计时器
    this.flashTimer = 0;
    // 闪动计数器
    this.flashIterations = 0;
    this.invertTrigger = false;

    this.config = DistanceMeter.config;
    // 最大记录为万位数
    this.maxScoreUnits = this.config.MAX_DISTANCE_UNITS;
    this.init(canvasWidth);
}
// 8.2 DistanceMeter定义属性
DistanceMeter.dimensions = {
    WIDTH: 10, // 每个字符的宽度
    HEIGHT: 13, // 每个字符的高
    DEST_WIDTH: 11 // 间隙
};
DistanceMeter.yPos = [0, 13, 27, 40, 53, 67, 80, 93, 107, 120];
DistanceMeter.config = {
    MAX_DISTANCE_UNITS: 5,  // 初始时记录的分数上限为5位数，即99999

    ACHIEVEMENT_DISTANCE: 100, // 每隔100米距离记录器的数字出现闪动特效

    COEFFICIENT: 0.025, // 将移动距离转化为合理的数值所用的转化系数

    FLASH_DURATION: 1000 / 4, // 每250ms闪动一次

    FLASH_ITERATIONS: 3 // 闪动次数
};
// 8.3 DistanceMeter原型链中的方法
DistanceMeter.prototype = {
    init: function(width) {
        // 初始化距离记录器为00000
        var maxDistanceStr = '';

        this.calcXPos(width);
        this.maxScore = this.maxScoreUnits;
        for (var i = 0; i < this.maxScoreUnits; i++) {
            this.draw(i, 0);
            this.defaultString += '0';
            maxDistanceStr += '9';
        }
        // 99999
        this.maxScore = parseInt(maxDistanceStr);
    },
    // 计算出xPos
    calcXPos: function(canvasWidth) {
        this.x = canvasWidth - (DistanceMeter.dimensions.DEST_WIDTH *
            (this.maxScoreUnits + 1));
    },
    draw: function(digitPos, value, opt_highScore) {
        var sourceWidth = DistanceMeter.dimensions.WIDTH;
        var sourceHeight = DistanceMeter.dimensions.HEIGHT;
        var sourceX = DistanceMeter.dimensions.WIDTH * value;
        var sourceY = 0;

        var targetX = digitPos * DistanceMeter.dimensions.DEST_WIDTH;
        var targetY = this.y;
        var targetWidth = DistanceMeter.dimensions.WIDTH;
        var targetHeight = DistanceMeter.dimensions.HEIGHT;

        sourceX += this.spritePos.x;
        sourceY += this.spritePos.y;

        this.ctx.save();

        if (opt_highScore) {
            // 将最高分放至当前分数的左边
            var highScoreX = this.x - (this.maxScoreUnits * 2) *
                DistanceMeter.dimensions.WIDTH;
            this.ctx.translate(highScoreX, this.y);
        } else {
            this.ctx.translate(this.x, this.y);
        }
        this.ctx.drawImage(this.image, sourceX, sourceY,
            sourceWidth, sourceHeight,
            targetX, targetY,
            targetWidth, targetHeight
        );
        this.ctx.restore();
    },
    /**
     * 将像素距离转化为“真实距离”
     * @param distance  像素距离
     * @returns {number} “真实距离”
     */
    getActualDistance: function(distance) {
        return distance ? Math.round(distance * this.config.COEFFICIENT) : 0;
    },
    /**
     * 更新距离记录器
     * @param {number} deltaTime
     * @param {number} distance
     * @returns {boolean} 是否播放声音
     */
    update: function(deltaTime, distance) {
        var paint = true;
        var playSound = false;

        if (!this.acheivement) {
            distance = this.getActualDistance(distance);
            // 分数超过最大分数时增加至十万位999999
            if (distance > this.maxScore && this.maxScoreUnits == this.config.MAX_DISTANCE_UNITS) {
                this.maxScoreUnits++;
                this.maxScore = parseInt(this.maxScore + '9');
            } else {
                this.distance = 0;
            }

            if (distance > 0) {
                // 每100距离开始闪动特效并播放声音
                if (distance % this.config.ACHIEVEMENT_DISTANCE == 0) {
                    // Flash score and play sound.
                    this.acheivement = true;
                    this.flashTimer = 0;
                    playSound = true;
                }

                // 让数字以0开头
                var distanceStr = (this.defaultString +
                distance).substr(-this.maxScoreUnits);
                this.digits = distanceStr.split('');
            } else {
                this.digits = this.defaultString.split('');
            }
        } else {
            // 到达目标分数时闪动分数
            if (this.flashIterations <= this.config.FLASH_ITERATIONS) {
                this.flashTimer += deltaTime;

                if (this.flashTimer < this.config.FLASH_DURATION) {
                    paint = false;
                } else if (this.flashTimer >
                    this.config.FLASH_DURATION * 2) {
                    this.flashTimer = 0;
                    this.flashIterations++;
                }
            } else {
                this.acheivement = false;
                this.flashIterations = 0;
                this.flashTimer = 0;
            }
        }

        // 非闪动时绘制分数
        if (paint) {
            for (var i = this.digits.length - 1; i >= 0; i--) {
                this.draw(i, parseInt(this.digits[i]));
            }
        }

        this.drawHighScore();
        return playSound;
    },
    // 绘制高分榜
    drawHighScore: function() {
        this.ctx.save();
        this.ctx.globalAlpha = .8; // 让字符看起来颜色稍浅
        for (var i = this.highScore.length - 1; i >= 0; i--) {
            this.draw(i, parseInt(this.highScore[i], 10), true);
        }
        this.ctx.restore();
    },
    setHighScore: function(distance) {
        distance = this.getActualDistance(distance);
        var highScoreStr = (this.defaultString +
        distance).substr(-this.maxScoreUnits);
        // 10和11分别对应雪碧图中的H、I
        this.highScore = ['10', '11', ''].concat(highScoreStr.split(''));
    },
    // 重置记录器为00000
    reset: function() {
        this.update(0);
        this.acheivement = false;
    }
};

// 8.4 游戏界面显示通过GameOverPanel构造函数完成
function GameOverPanel(canvas, textImgPos, restartImgPos, dimensions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasDimensions = dimensions;
    this.textImgPos = textImgPos;
    this.restartImgPos = restartImgPos;
    this.draw();
}
GameOverPanel.dimensions = {
    TEXT_X: 0,
    TEXT_Y: 13,
    TEXT_WIDTH: 191,
    TEXT_HEIGHT: 11,
    RESTART_WIDTH: 36,
    RESTART_HEIGHT: 32
};
GameOverPanel.prototype = {
    /**
     * Update the panel dimensions.
     * @param {number} width New canvas width.
     * @param {number} opt_height Optional new canvas height.
     */
    updateDimensions: function(width, opt_height) {
        this.canvasDimensions.WIDTH = width;
        if (opt_height) {
            this.canvasDimensions.HEIGHT = opt_height;
        }
    },

    /**
     * Draw the panel.
     */
    draw: function() {
        var dimensions = GameOverPanel.dimensions;

        var centerX = this.canvasDimensions.WIDTH / 2;

        // Game over text.
        var textSourceX = dimensions.TEXT_X;
        var textSourceY = dimensions.TEXT_Y;
        var textSourceWidth = dimensions.TEXT_WIDTH;
        var textSourceHeight = dimensions.TEXT_HEIGHT;

        var textTargetX = Math.round(centerX - (dimensions.TEXT_WIDTH / 2));
        var textTargetY = Math.round((this.canvasDimensions.HEIGHT - 25) / 3);
        var textTargetWidth = dimensions.TEXT_WIDTH;
        var textTargetHeight = dimensions.TEXT_HEIGHT;

        var restartSourceWidth = dimensions.RESTART_WIDTH;
        var restartSourceHeight = dimensions.RESTART_HEIGHT;
        var restartTargetX = centerX - (dimensions.RESTART_WIDTH / 2);
        var restartTargetY = this.canvasDimensions.HEIGHT / 2;


        textSourceX += this.textImgPos.x;
        textSourceY += this.textImgPos.y;

        // Game over text from sprite.
        this.ctx.drawImage(imgSprite,
            textSourceX, textSourceY, textSourceWidth, textSourceHeight,
            textTargetX, textTargetY, textTargetWidth, textTargetHeight);

        // Restart button.
        this.ctx.drawImage(imgSprite,
            this.restartImgPos.x, this.restartImgPos.y,
            restartSourceWidth, restartSourceHeight,
            restartTargetX, restartTargetY, dimensions.RESTART_WIDTH,
            dimensions.RESTART_HEIGHT);
    }
};

// 8.5 游戏音效通过base64形式，可以查阅文档了解AudioContext API的用法
function decodeBase64ToArrayBuffer(base64String) {
    var len = (base64String.length / 4) * 3;
    var str = atob(base64String);
    var arrayBuffer = new ArrayBuffer(len);
    var bytes = new Uint8Array(arrayBuffer);

    for (var i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}

// 九、9.1 背景管理通过Horizon构造函数完成
function Horizon(canvas, spritePos, dimensions, gapCoefficient) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = Horizon.config;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    this.obstacles = []; // 存储障碍物的数组
    this.obstacleHistory = []; //记录障碍物数组中障碍物的类型
    this.horizonOffsets = [0, 0];
    this.cloudFrequency = this.config.CLOUD_FREQUENCY;
    this.spritePos = spritePos;
    this.nightMode = null ;

    //云
    this.clouds = [];
    this.cloudSpeed = this.config.BG_CLOUD_SPEED;

    //地面
    this.horizonLine = null ;
    this.init();
}
// 9.2 Horizon定义属性
Horizon.config = {
    BG_CLOUD_SPEED: 0.2,
    BUMPY_THRESHOLD: .3,
    CLOUD_FREQUENCY: .5,
    HORIZON_HEIGHT: 16,
    MAX_CLOUDS: 6
};
// 9.3 Horizon原型链中的方法
Horizon.prototype = {
    //初始化地平面，云
    init: function() {
        this.addCloud();
        this.horizonLine = new HorizonLine(this.canvas,this.spritePos.HORIZON);
        this.nightMode = new NightMode(this.canvas,this.spritePos.MOON,this.dimensions.WIDTH);
    },
    update: function(deltaTime, currentSpeed, updateObstacles, showNightMode) {
        this.runningTime += deltaTime;
        this.horizonLine.update(deltaTime, currentSpeed);
        this.nightMode.update(showNightMode);
        this.updateClouds(deltaTime, currentSpeed);

        if (updateObstacles) {
            this.updateObstacles(deltaTime, currentSpeed);
        }
    },
    updateClouds: function(deltaTime, speed) {
        var cloudSpeed = this.cloudSpeed / 1000 * deltaTime * speed;
        var numClouds = this.clouds.length;

        if (numClouds) {
            for (var i = numClouds - 1; i >= 0; i--) {
                this.clouds[i].update(cloudSpeed);
            }
            var lastCloud = this.clouds[numClouds - 1];
            if (numClouds < this.config.MAX_CLOUDS &&
                (this.dimensions.WIDTH - lastCloud.xPos) > lastCloud.cloudGap &&
                this.cloudFrequency > Math.random()) {
                this.addCloud();
            }

            this.clouds = this.clouds.filter(function(obj) {
                    return !obj.remove;
                }
            );
        } else {
            this.addCloud();
        }
    },
    updateObstacles: function(deltaTime, currentSpeed) {
        // Obstacles, move to Horizon layer.
        var updatedObstacles = this.obstacles.slice(0);

        for (var i = 0; i < this.obstacles.length; i++) {
            var obstacle = this.obstacles[i];
            obstacle.update(deltaTime, currentSpeed);

            // Clean up existing obstacles.
            if (obstacle.remove) {
                updatedObstacles.shift();
            }
        }
        this.obstacles = updatedObstacles;

        if (this.obstacles.length > 0) {
            var lastObstacle = this.obstacles[this.obstacles.length - 1];

            if (lastObstacle && !lastObstacle.followingObstacleCreated &&
                lastObstacle.isVisible() &&
                (lastObstacle.xPos + lastObstacle.width + lastObstacle.gap) <
                this.dimensions.WIDTH) {
                this.addNewObstacle(currentSpeed);
                lastObstacle.followingObstacleCreated = true;
            }
        } else {
            // Create new obstacles.
            this.addNewObstacle(currentSpeed);
        }
    },
    removeFirstObstacle: function() {
        this.obstacles.shift();
    },
    addNewObstacle: function(currentSpeed) {
        var obstacleTypeIndex = getRandomNum(0, Obstacle.types.length - 1);
        var obstacleType = Obstacle.types[obstacleTypeIndex];

        if (this.duplicateObstacleCheck(obstacleType.type) || currentSpeed < obstacleType.minSpeed) {
            this.addNewObstacle(currentSpeed);
        } else {
            var obstacleSpritePos = this.spritePos[obstacleType.type];
            this.obstacles.push(new Obstacle(this.ctx,obstacleType,obstacleSpritePos,this.dimensions,
                this.gapCoefficient,currentSpeed,obstacleType.width));

            this.obstacleHistory.unshift(obstacleType.type);
        }

        if (this.obstacleHistory.length > 1) {
            this.obstacleHistory.splice(Runner.config.MAX_OBSTACLE_DUPLICATION);
        }
    },
    duplicateObstacleCheck: function(nextObstacleType) {
        var duplicateCount = 0;

        for (var i = 0; i < this.obstacleHistory.length; i++) {
            duplicateCount = this.obstacleHistory[i] == nextObstacleType ? duplicateCount + 1 : 0;
        }
        return duplicateCount >= Runner.config.MAX_OBSTACLE_DUPLICATION;
    },
    reset: function() {
        this.obstacles = [];
        this.horizonLine.reset();
        this.nightMode.reset();
    },
    resize: function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    },
    addCloud: function() {
        this.clouds.push(new Cloud(this.canvas,this.spritePos.CLOUD,this.dimensions.WIDTH));
    }
};

function getTimeStamp() {
    return performance.now();
}

var now = getTimeStamp();

window['Runner'] = Runner;

//不写onload方法就显示不出图片
window.onload = function() {
    var runner = new Runner('.interstitial-wrapper');
};

