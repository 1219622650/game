var btn = document.getElementsByClassName('btn')[0],
            box = document.getElementsByClassName('box')[0],
            flagBox = document.getElementsByClassName('flagBox')[0],
            minesNum,
            mineOver,
            block,
            mineMap = [];
            
        var alertBox = document.getElementsByClassName('alertBox')[0],
            alertImg = document.getElementsByClassName('alertImg')[0],
            alertText = document.getElementsByClassName('alertText')[0],
            restart = document.getElementsByClassName('restart')[0];
        var score = document.getElementsByClassName('score')[0]



        bindEvent();
        function bindEvent() {                                  //判定事件函数
            btn.onclick = function () {
                btn.style.display = 'none';
                box.style.display = 'block';
                flagBox.style.display = 'block';
                init();
            }
            box.oncontextmenu = function () {
                return false;
            }
            box.onmousedown = function (e) {
                var event = e.target;
                if (e.which == 1) {
                    leftClick(event);
                } else if (e.which == 3) {
                    rightClick(event);
                }
            }
            restart.onclick = function () {
                btn.style.display = 'block';
                box.style.display = 'none';
                flagBox.style.display = 'none';
                alertBox.style.display = 'none';
                box.innerHTML = "";
            }
        }
        function init() {
            minesNum = 10;
            mineOver = 10;
            score.innerHTML = mineOver;
            for (var i = 0; i < 10; i++) {                          //循环创建横竖100个Div
                for (var j = 0; j < 10; j++) {
                    var con = document.createElement('div');        //创建div语句
                    con.classList.add('block');                     //添加class ‘block’
                    con.setAttribute('id', i + '-' + j);            //添加一个唯一ID
                    box.appendChild(con);                           //丢给box
                    mineMap.push({ mine: 0 });                         //给他mine一个属性用来用来判断雷存在吗
                }
            }
            block = document.getElementsByClassName('block');
            while (document.querySelectorAll('.islei').length < minesNum) {                                          //判断10
                var mineIndex = Math.floor(Math.random() * 100);        //向下取整：生成0-99的随机数
                block[mineIndex].classList.add('islei');            //*className 'block'是个类数组让随机的出来的数的哪一位添加个islei
            }
        }
        function leftClick(dom) {                                      //if左边点到雷的情况
            if (dom.classList.contains('flag')) {
                return;
            }
            var islei = document.getElementsByClassName('islei');
            if (dom && dom.classList.contains('islei')) {
                for (var i = 0; i < islei.length; i++) {
                    islei[i].classList.add('show');
                }
                setTimeout(function () {
                    alertBox.style.display = 'block';
                    alertImg.style.backgroundImage = 'url(img/失败副本.png)';
                    alertText.innerHTML = '失败了~~';
                }, 800)

            } else {                                                   //else左边点到雷的情况
                var n = 0;
                var posArr = dom && dom.getAttribute('id').split('-');
                var posX = posArr && +posArr[0];
                var posY = posArr && +posArr[1];
                dom && dom.classList.add('num');
                for (var i = posX - 1; i <= posX + 1; i++) {
                    for (var j = posY - 1; j <= posY + 1; j++) {
                        var aroundBox = document.getElementById(i + '-' + j);
                        if (aroundBox && aroundBox.classList.contains('islei')) {
                            n++;
                        }
                    }
                }
                dom && (dom.innerHTML = n);
                if (n == 0) {
                    for (var i = posX - 1; i <= posX + 1; i++) {
                        for (var j = posY - 1; j <= posY + 1; j++) {
                            var nearBox = document.getElementById(i + '-' + j);
                            if (nearBox && nearBox.length != 0) {
                                if (!nearBox.classList.contains('check')) {
                                    nearBox.classList.add('check');
                                    leftClick(nearBox);
                                }
                            }
                        }
                    }
                    dom.innerHTML = "";             //如果是0就让点击的div为空
                }
            }
            var num = document.getElementsByClassName('num');
            if(num.length >= 98){
                setTimeout(function () {
                    alertBox.style.display = 'block';
                    alertImg.style.backgroundImage = 'url(img/胜利副本.png)';
                    alertText.innerHTML = '恭喜通关!!!';
                }, 800)
            }
        }
        function rightClick(dom) {
            if (!dom.classList.contains('num')) {
                dom.classList.toggle('flag');
                if (dom.classList.contains('flag')) {
                    mineOver--;
                }
                if (!dom.classList.contains('flag')) {
                    mineOver++;
                }
                score.innerHTML = mineOver;
            }
            var flag = document.getElementsByClassName('islei flag');
            var flag2 = document.getElementsByClassName('flag');
            if(flag.length == minesNum && flag2.length == minesNum){
                setTimeout(function () {
                    alertBox.style.display = 'block';
                    alertImg.style.backgroundImage = 'url(img/胜利副本.png)';
                    alertText.innerHTML = '恭喜通关!!!';
                }, 800)
            }
        }
