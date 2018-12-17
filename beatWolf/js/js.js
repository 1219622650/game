
let wolfAnimation,                          //定时器  
    timer;
    ruleBool = true;
$('.startGame').click(function () {
    startGame();
})
$('.restart').click(function () {
    startGame();
})
$('.rule').click(function () {
    if (ruleBool == true) {
        $('.rules').fadeIn();
        ruleBool = false;
    } else {
        $('.rules').fadeOut();
        ruleBool = true
    }
})
function startGame() {
    $('.progress').css({ width: 236 })
    $('.score').html(0);
    $('.gameScore>span').html(0)
    $('.start').fadeOut(100);
    $('.gameOver').fadeOut(100);
    gameProgress();
    gameContent();
}
function gameProgress() {
    var progressWidth = $('.progress').width();//用一个变量接收获取宽度
    $('.progress').fadeIn(100);
    timer = setInterval(function () {
        progressWidth -= 10;                        //进度条的速度
        $('.progress').css({ width: progressWidth }) //减20后赋值回自身
        if (progressWidth <= 0) {
            overGame();
        }
    }, 1000);
}
function gameContent() {
    let arrH = ['img/h0.png', 'img/h1.png', 'img/h2.png', 'img/h3.png', 'img/h4.png', 'img/h5.png', 'img/h6.png', 'img/h7.png', 'img/h8.png', 'img/h9.png']
    let arrX = ['img/x0.png', 'img/x1.png', 'img/x2.png', 'img/x3.png', 'img/x4.png', 'img/x5.png', 'img/x6.png', 'img/x7.png', 'img/x8.png', 'img/x9.png']
    let arr = [
        { left: '140px', top: '180px' },
        { left: '252px', top: '214px' },
        { left: '35px', top: '238px' },
        { left: '145px', top: '280px' },
        { left: '32px', top: '316px' },
        { left: '270px', top: '305px' },
        { left: '50px', top: '412px' },
        { left: '165px', top: '385px' },
        { left: '280px', top: '415px' }
    ]
    let random = Math.floor(Math.random() * 9); //0到8的随机数产生随机位置
    let wolfType = Math.round(Math.random());   //0到1的随机数灰太狼和小灰灰的类型
    window.wolfImg = $('<img>');                //生成一张window.img图片
    let count = 0;
    let bool = true;                              //记录当前的第几张出来的图片
    wolfType = (wolfType == 0) ? arrH : arrX;   //条件0是灰太狼，1是小灰灰。
    wolfAnimation = setInterval(function () {     //产生判断条件
        count++;
        if (count == 8 || bool == true && count > 5) {
            wolfImg.remove();
            clearInterval(wolfAnimation);
            gameContent();
        } else {
            wolfImg.attr('src', wolfType[count]);
        }
    }, 150)                                     //图片出来的速度
    wolfImg.css({                               //赋属性
        position: 'absolute',
        left: arr[random].left,
        top: arr[random].top,
        cursor: 'pointer'
    })
    $('.wrap').append(wolfImg);                 //插入图片
    wolfImg.one('click', function () {           //图片点击在这。。。。。
        let score = parseInt($('.score').html());
        let tempSrc = wolfImg.attr('src');
        bool = false;
        if (tempSrc.indexOf('h') > 0) {
            score += 10;
            $('.score').html(score);
            $('.gameScore>span').html(score)
        } else {
            bool = false;
            var outTime = setTimeout(function () {
                overGame();
            }, 450)
        }
    })
}
function overGame() {
    clearInterval(timer);                   //关闭进度条
    clearInterval(wolfAnimation);           //关闭动画
    wolfImg.remove();                       //删除图片
    $('.gameOver').fadeIn(100)              //显示介素界面
    $('.progress').fadeOut(100);            //关闭进度条
}
