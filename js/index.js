window.onload = function () {
    //返回顶部动画
    var back_top = document.getElementsByClassName('w_back_top')[0];
    var back_top_btn = document.getElementById('w_btn');
    back_top_btn.onclick = function () {
        var timer = setInterval(function () {
            scrollBy(0, -50)
            if (scrollY == 0) {
                clearInterval(timer);
            }
        }, 20)
    }
    window.onscroll = function () {
        var srcollTop = window.scrollY;
        if (srcollTop > 100) {
            back_top.style.opacity = '1';
        } else {
            back_top.style.opacity = '0';
        }
    }
    function bt() {
        var width1 = window.innerWidth;
        var width2 = window.outerWidth;
        if (width1 < width2) {
            back_top.style.right = '5px';
        } else {
            back_top.style.right = '130px';
        }
    }
    window.onresize = bt;
    bt();




    var s_fl = document.querySelector('.fl');
    var s_cookie = document.cookie;
    var arr5 = [];
    if(s_cookie.length>0){
        s_cookie = s_cookie.split('=');
        if(s_cookie[0]=='user'){
            console.log(s_cookie[1]);
            if(s_cookie[1] == 'xxx'){

            }else{ 
                arr5 = JSON.parse(s_cookie[1]);
                s_fl.innerHTML = `
                    <span>Welcome</span>
                    <a href="#">${arr5[0].email}</a>
                    <span style="color:yellow">&nbsp;test,</span>
                    <a class="s_out" href="#">Sign out</a>
                `
            }
        }   
    }

    var s_out = s_fl.querySelector('.s_out');
    console.log(s_out);
    console.log(s_fl);
    s_out.onclick = function(){
        var now = new Date();
        now = now.setDate(now.getDate()-1);
        document.cookie = 'user=xxx;expires='+now.toString+';path=/';
        s_fl.innerHTML = `
            <span>Welcome</span>
            <a href="./html/sign.html">Sign in</a>
            <span>or</span>
            <a href="./html/sign.html">Register</a>
            <span style="color:yellow">&nbsp;test,</span>
            <a class="s_out" href="#">Sign out</a>
        `
    }








    /**
     * 商品数据,全部在分割线里面.另外还有2个文件,在data文件夹里面
     */
    // -----------------------------华丽分隔线----------------------------------------------------------------------
    //商品列表
    var arr;
    var pageNum = 1;
    var pageQty = 20;
    var xhr_goods = new XMLHttpRequest();
    var goodslist = document.getElementsByClassName('w_goodslist')[0];
    var pageBottom = document.querySelector('#pageTop');
    var pageBottom = document.querySelector('#pageBottom');
    var pageTotal = document.querySelector('#pageTotal');
    var flag = null;//设置开关
    xhr_goods.onreadystatechange = function () {
        if (xhr_goods.readyState === 4 && (xhr_goods.status === 200 || xhr_goods.status === 304)) {
            var res = JSON.parse(xhr_goods.responseText);
            arr = res.data;
            console.log(arr);
            //数组导入到并写进HTML结构,先获取goodslist大盒子元素
            goodslist.innerHTML = '';
            arr.forEach(run);
            //封装函数
            function run(item, idx) {

                //遍历数组,将每个对象信息写成HTML
                // <div class="box">
                //     <img src="src" alt="" />
                //     <input type="checkbox" name="goodslist">
                //     <a href="">name</a>
                //     <span>price1</span>
                //     <span>price2</span>
                //     <span>USD</span>
                //     <a href="">store</a>
                //     <p>num</p>
                // </div>
                var box = document.createElement('div');
                // box.className = 'w_goodslist_box';
                var img = document.createElement('img');
                img.src = item.url;
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'goodslist';
                var a1 = document.createElement('a');
                a1.appendChild(checkbox);
                a1.innerHTML = a1.innerHTML + item.name;
                //写入a的href页面传参
                //url:'images/w_0.png',
                // name:'Decent Module Case Silicone Skin Cover for Iphone...',
                // price1:'USD219',
                // price2:'USD189',
                // USD:'Save USD 30',
                // store:'wholesale',
                // num:1,
                //  html/goodslist.html?url= &name= &price1= &price2= &USD= &store= &num=
                //  先转码
                window.encodeURI(item.url);
                window.encodeURI(item.name);
                window.encodeURI(item.price1);
                window.encodeURI(item.price2);
                window.encodeURI(item.USD);
                window.encodeURI(item.store);
                window.encodeURI(item.num);
                a1.href = 'html/goodslist.html?url=' + item.url + '&name=' + item.name + '&price1=' + item.price1 + ' &price2=' + item.price2 + '&USD=' + item.USD + '&store=' + item.store + '&num=' + item.num;
                a1.target = '_blank';
                var span1 = document.createElement('span');
                span1.innerHTML = item.price1;
                var span2 = document.createElement('span');
                span2.innerHTML = item.price2;
                var span3 = document.createElement('span');
                span3.innerHTML = item.USD;
                var a2 = document.createElement('a');
                a2.innerHTML = item.store;
                var p = document.createElement('p');
                p.innerHTML = '序号:' + item.num;
                box.appendChild(img);
                box.appendChild(a1);
                box.appendChild(span1);
                box.appendChild(span2);
                box.appendChild(span3);
                box.appendChild(a2);
                box.appendChild(p);
                goodslist.appendChild(box);
            };
            pageTotal.innerHTML = res.total;

            var page_total = Math.ceil(res.total / pageQty);
            // pageTop根据总数写入a标签数量
            pageTop.innerHTML = '';
            var li_first = document.createElement('li');
            li_first.innerHTML = "<a>&lt;</a>";
            pageTop.appendChild(li_first);
            for (var i = 0; i < page_total; i++) {
                var li = document.createElement('li');
                li.innerHTML = `<a>${i + 1}</a>`;
                pageTop.appendChild(li);
            }
            var li_last = document.createElement('li');
            li_last.innerHTML = "<a>Next</a><i></i>";
            pageTop.appendChild(li_last);

            for (var i = 0; i < pageTop.children.length; i++) {
                pageTop.children[i].children[0].style.color = "#000";
            }
            pageTop.children[pageNum].children[0].style.color = "#ff4500";
            //pageBottom根据总数写入a标签数量
            pageBottom.innerHTML = '';
            var li_first = document.createElement('li');
            li_first.innerHTML = "<a>&lt;</a>";
            pageBottom.appendChild(li_first);
            for (var i = 0; i < page_total; i++) {
                var li = document.createElement('li');
                li.innerHTML = `<a>${i + 1}</a>`;
                pageBottom.appendChild(li);
            }
            var li_last = document.createElement('li');
            li_last.innerHTML = "<a>Next</a><i></i>";
            pageBottom.appendChild(li_last);

            for (var i = 0; i < pageBottom.children.length; i++) {
                pageBottom.children[i].children[0].style.color = "#000";
            }
            pageBottom.children[pageNum].children[0].style.color = "#ff4500";
        }
    }
    xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
    xhr_goods.send(null);

    //获取数据,实现切换
    pageTop.onclick = (e) => {
        e = e || window.event;
        var target = e.target || e.srcElemnt;
        if (target.tagName.toLowerCase() === 'a' && target.innerHTML.toLowerCase() !== 'next' && target.innerHTML.toLowerCase() !== '&lt;') {
            for (var i = 0; i < pageTop.children.length; i++) {
                pageTop.children[i].children[0].style.color = "#000";
            }
            target.style.color = "#ff4500";
            pageNum = target.innerHTML;
            xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
            xhr_goods.send(null);
        } else if (target.innerHTML.toLowerCase() === 'next') {
            if (pageNum < Math.ceil(pageTotal.innerText / pageQty)) {
                pageNum++;
                xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
                xhr_goods.send(null);
            }
        } else if (target.innerHTML.toLowerCase() === '&lt;') {
            if (pageNum > 1) {
                pageNum--;
                xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
                xhr_goods.send(null);
            }
        }
    }

    pageBottom.onclick = (e) => {
        e = e || window.event;
        var target = e.target || e.srcElemnt;
        if (target.tagName.toLowerCase() === 'a' && target.innerHTML.toLowerCase() !== 'next' && target.innerHTML.toLowerCase() !== '&lt;') {
            for (var i = 0; i < pageBottom.children.length; i++) {
                pageBottom.children[i].children[0].style.color = "#000";
            }
            target.style.color = "#ff4500";
            pageNum = target.innerHTML;
            xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
            xhr_goods.send(null);
        } else if (target.innerHTML.toLowerCase() === 'next') {
            if (pageNum < Math.ceil(pageTotal.innerText / pageQty)) {
                pageNum++;
                xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
                xhr_goods.send(null);
            }

        } else if (target.innerHTML.toLowerCase() === '&lt;') {
            console.log(66)
            if (pageNum > 1) {
                pageNum--;
                xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
                xhr_goods.send(null);
            }
        }
    }
    //实现数据排序
    var btn = document.getElementById('w_header_bth2');
    btn.onclick = function () {
        if (flag == null) {
            flag = true;
        } else if (flag == true) {
            flag = false;
        } else if (flag == false) {
            flag = null;
        }

        goodslist.innerHTML = '';
        if (flag==true) {
            btn.lastChild.style.backgroundImage = 'url("images/main_arror_2.png")';
            btn.lastChild.style.opacity = 1;
        } else if(flag==false){
            btn.lastChild.style.backgroundImage = 'url("images/main_arror_1.png")';
            btn.lastChild.style.opacity = 1;
        } else if (flag == null) {
            btn.lastChild.style.backgroundImage = 'url("images/main_arror_1.png")';
            btn.lastChild.style.opacity = 0;
        }
        xhr_goods.open('get', `php/goods.php?pageNum=${pageNum}&pageQty=${pageQty}&type=${flag}`, true);
        xhr_goods.send(null);
    }



// -----------------------------华丽分隔线----------------------------------------------------------------------


    //搜索栏的吸顶
    var top1 = document.getElementsByClassName('top1')[0];
    var top2 = document.getElementsByClassName('top2')[0];
    document.onscroll = function () {
        var heigthtop = window.scrollY;
        if (heigthtop >= 30) {
            top1.className = 'top1 fixed1';
            top2.className = 'top2 fixed2';
        } else {
            top1.className = 'top1';
            top2.className = 'top2';
        }
    }
    //侧边栏收缩动画
    var aside_t = document.querySelector('.aside_t');
    var girl = document.getElementsByClassName('girl')[0];
    var Men = document.getElementsByClassName('Men')[0];
    var Women = document.getElementsByClassName('Women')[0];
    var ilist_1 = document.getElementsByClassName('ilist_1')[0];
    var ilist_2 = document.getElementsByClassName('ilist_2')[0];
    var ilist_3 = document.getElementsByClassName('ilist_3')[0];
    var aside_b = document.querySelector('.aside_b');
    var juli = 115;
    ilist_1.style.display = 'none';
    ilist_2.style.display = 'none';
    ilist_3.style.display = 'none';
    var loop1 = false;
    var loop2 = false;
    var loop3 = false;
    girl.onclick = function () {
        if (loop1 === false) {
            ilist_1.style.display = 'block';
            loop1 = true;
            juli += 30;
            animate(aside_b, { top: juli });
        } else {
            ilist_1.style.display = 'none';
            loop1 = false;
            juli -= 30;
            animate(aside_b, { top: juli });
        }
    }
    Men.onclick = function () {
        if (loop2 === false) {
            ilist_2.style.display = 'block';
            loop2 = true;
            juli += 300;
            animate(aside_b, { top: juli });
        } else {
            ilist_2.style.display = 'none';
            loop2 = false;
            juli -= 300;
            animate(aside_b, { top: juli });
        }
    }
    Women.onclick = function () {
        if (loop3 === false) {
            ilist_3.style.display = 'block';
            loop3 = true;
            juli += 210;
            animate(aside_b, { top: juli });
        } else {
            ilist_3.style.display = 'none';
            loop3 = false;
            juli -= 210;
            animate(aside_b, { top: juli });
        }
    }

    //轮播图动画
    function getCss(ele, attr) {
        // 判断浏览器是否支持getComputedStyle
        if (window.getComputedStyle) {
            return getComputedStyle(ele)[attr];
        }

        // ie8-
        else if (ele.currentStyle) {
            return ele.currentStyle[attr];
        }

        // 返回内联样式
        else {
            return ele.style[attr];
        }
    }
    function animate(ele, opt, callback) {
        //遍历属性，返回的是属性名
        var attrQty = 0;
        // 通过判断达到目标值的次数等于属性个数来确定是否所有变化都完成，为了知道对象的属性个数，把对象遍历加入到一个空数组中，那么那个数组的长度就是对象的属性个数了，每一次达到目标值，就给一个数加一，当那个数等于所有属性个数的时候，就是所有变化完成的时候，那么就可以执行callback了
        for (var attr in opt) {
            createTimer(attr);
            attrQty++;
        }

        function createTimer(attr) {
            // 根据属性定义定时器名字，属性名+timer避免同名冲突
            var timerName = attr + 'timer';

            // 获取目标值
            var target = opt[attr];
            // 开始就获取目标值
            // 变量要用[]

            clearInterval(ele[timerName]);
            // 给节点绑定timerName，便于关闭定时器
            ele[timerName] = setInterval(function () {
                // 获取当前值
                var current = getCss(ele, attr);//10px,0.5,20em,2.4rem,40deg
                // 获取元素css样式，兼容ie8-

                // 提取单位
                var unit = current.match(/[a-z]+$/);

                // match匹配字符串，返回一个数组,匹配以数字结尾的字母
                unit = unit ? unit[0] : '';


                // 提取值
                current = parseFloat(current);
                // parseFloat:解析一个字符串，并返回一个浮点数,截取数字，直到数字的末端


                // 计算速度（最小变化值：1/-1）
                // 避免速度变成0
                var speed = (target - current) / 10;
                // 速度等于目标值减去当前值
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                // 如果为正，像上取整，如果为负，向下取整

                // 针对opacity属性计算速度
                if (attr === 'opacity') {
                    speed = speed > 0 ? 0.01 : -0.01;

                }

                // 到达目标值后清除动画定时器
                if (current === target || speed === 0) {
                    clearInterval(ele[timerName]);

                    // 重置目标值
                    current = target - speed;

                    attrQty--;
                    // 执行回调函数
                    if (attrQty === 0 && typeof callback == 'function') {
                        callback();
                    }

                }

                ele.style[attr] = current + speed + unit;
            }, 30);
        }
    }
    var slideShow = document.querySelector('.slideShow');
    var banner = document.querySelector('.banner')
    slideShow.appendChild(slideShow.children[0].cloneNode(true));
    var img = slideShow.children;

    var page = document.querySelector('.page');
    var span = page.children;
    var len = img.length;
    var itemWidth = img[0].offsetWidth;
    var idx = 0;
    page.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() == 'span') {
            idx = target.innerText - 1;
            showPic();
        }
    }
    span[0].className = 'active';
    banner.onmouseenter = function () {
        clearInterval(outerTimer);
    }
    banner.onmouseleave = function () {
        outerTimer = setInterval(autoPlay, 3000);
    }
    var outerTimer = setInterval(autoPlay, 3000);
    slideShow.style.width = len * itemWidth + 'px';
    function autoPlay() {
        idx++;
        showPic();
    }
    function showPic() {
        if (idx >= len) {
            idx = 1;
            slideShow.style.left = 0;
        } if (idx < 0) {
            idx = len - 2;
        }
        var target = -idx * itemWidth;
        animate(slideShow, { left: target });

        for (var i = 0; i < len - 1; i++) {
            span[i].className = '';
            if (idx == len - 1) {
                span[0].className = 'active';
            } else {
                span[idx].className = 'active';
            }
        }
    }
    //展示商品图片动画
    var listimg = document.querySelector('.listimg');
    var alist = listimg.children;
    // listimg.onmouseover = function(e){
    //      var target = e.target;
    //      if(target.tagName.toLowerCase() =='img'){
    //          animate(target.parentNode.children[0],{top:90});
    //      }
    // }
    // listimg.onmouseout= function(e){
    //      var target = e.target;
    //      if(target.tagName.toLowerCase() =='img'){
    //          animate(target.parentNode.children[0],{top:130});
    //      }
    // }
    for (var i = 0; i < alist.length; i++) {
        alist[i].onmouseenter = function () {
            animate(this.children[0], { top: 90 });
        }
        alist[i].onmouseleave = function () {
            animate(this.children[0], { top: 130 });
        }
    }
    //顶部购物车hover效果
    var shopcar = document.querySelector('header .h_t>ul>li:nth-of-type(2)>ul');
    shopcar.parentElement.onmouseenter = () => {
        clearTimeout(shopcar.timer);
        my_account.style.display = 'none';
        my_account.parentElement.children[0].style.color = "#fff";
        my_account.parentElement.children[0].style.backgroundColor = "#ff4500";
        shopcar.style.display = 'block';
        shopcar.parentElement.children[0].style.color = "#ff4500";
        shopcar.parentElement.children[0].style.backgroundColor = "#fff";
    }
    shopcar.parentElement.onmouseleave = () => {
        shopcar.timer = setTimeout(() => {
            shopcar.style.display = 'none';
            shopcar.parentElement.children[0].style.color = "#fff";
            shopcar.parentElement.children[0].style.backgroundColor = "#ff4500";
        }, 500);
    }
    //顶部my-account
    var my_account = document.querySelector('header .h_t>ul>li:nth-of-type(1)>ul');
    my_account.parentElement.onmouseenter = () => {
        clearTimeout(my_account.timer);
        shopcar.style.display = 'none';
        shopcar.parentElement.children[0].style.color = "#fff";
        shopcar.parentElement.children[0].style.backgroundColor = "#ff4500";
        my_account.style.display = 'block';
        my_account.parentElement.children[0].style.color = "#ff4500";
        my_account.parentElement.children[0].style.backgroundColor = "#fff";
    }
    my_account.parentElement.onmouseleave = () => {
        my_account.timer = setTimeout(() => {
            my_account.style.display = 'none';
            my_account.parentElement.children[0].style.color = "#fff";
            my_account.parentElement.children[0].style.backgroundColor = "#ff4500";
        }, 500);
    }
    //飞入购物车效果
    var imgs = goodslist.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick = function () {
            // console.log(imgs[this.idx].offsetLeft);
            var imgs_clone = this.cloneNode();
            imgs_clone.style.position = 'absolute';
            imgs_clone.style.top = this.offsetTop + 'px';
            imgs_clone.style.left = this.offsetLeft + 'px';
            document.body.appendChild(imgs_clone);
            var speed = 0;
            setInterval(() => {
                speed += 45;
                imgs_clone.style.transform = `rotate(${speed}deg)`;
            }, 20)
            animate(imgs_clone, { width: 10, height: 10, left: shopcar.parentElement.offsetLeft, top: 0, }, () => {
                document.body.removeChild(imgs_clone);
            });
        }
    }
}



