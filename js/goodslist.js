window.onload = function() {
        //返回顶部动画
        var back_top = document.getElementsByClassName('w_back_top')[0];
        var back_top_btn = document.getElementById('w_btn');
        back_top_btn.onclick = function() {
            var timer = setInterval(function() {
                scrollBy(0, -50);
                if (scrollY == 0) {
                    clearInterval(timer);
                }
            }, 20);
        };
        window.onscroll = function() {
            var srcollTop = window.scrollY;
            if (srcollTop > 100) {
                back_top.style.opacity = '1';
            } else {
                back_top.style.opacity = '0';
            }
        };

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
        //url传参首页传数据来到详情页
        //获取需要的属性
        var bigphoto = document.getElementById('bigphoto');
        var smallphoto = document.getElementById('smallphoto');
        var title = document.getElementById('title');
        var price1 = document.getElementById('price1');
        var price2 = document.getElementById('price2');
        //获取链接
        var params = location.search.substring(1).split('&');
        // console.log(params);
        //遍历,把属性名和属性拆开单独成为一个数组.
        params.forEach(function(item){
            var arr = item.split('=');
            //解码,属性名没有转码,只有属性值转码了
            var val = decodeURI(arr[1]);
            //判断是什么属性名,分别写入对于属性值
            switch (true){
                case (arr[0]=='url'):
                bigphoto.src = '../'+val;
                smallphoto.src = '../'+val;
                break;
                case (arr[0]=='name'):
                title.innerHTML = val;
                break;
                case (arr[0]=='price1'):
                price1.innerHTML = val.slice(3);
                break;
                case (arr[0]=='price2'):
                price2.innerHTML = val.slice(3);
                break;
            }
        });
        //选择颜色和size
        var div = document.getElementsByClassName('size')[0];
        var ul_1 =div.getElementsByTagName('ul')[0]; 
        var ul_2 =div.getElementsByTagName('ul')[1]; 

        ul_1.onclick = function(e){
            e = e||window.event;
            var target = e.target||e.srcElement;
            if (target.className==='none') {
                return;
            }
            var lis = ul_1.getElementsByTagName('li');
            for(var i=0;i<lis.length;i++){
                if (lis[i].className =='none') {
                    continue;
                }else{      
                lis[i].className = '';
                }
            }
            target.classList.add('active');
        }
        ul_2.onclick = function(e){
            e = e||window.event;
            var target = e.target||e.srcElement;
            if (target.className==='none') {
                return;
            }
            var lis = ul_2.getElementsByTagName('li');
            for(var i=0;i<lis.length;i++){
                if (lis[i].className =='none') {
                    continue;
                }else{      
                lis[i].className = '';
                }
            }
            target.classList.add('active1');
        }
        //qty数字框输入和计算
    
        var qty = document.getElementById('qty');
        var num = document.getElementById('num');
        var total = document.getElementById('total');
        // console.log(num,total)
        qty.onclick = function(){
            // console.log(qty.value);
            num.innerHTML = qty.value;
            total.innerHTML = (119.99*qty.value).toFixed(2)+'py6.';
        }
        //cookie 传参(title price1 price2 size imgurl)
        var btn = document.getElementById('car_btn');
        btn.onclick = function(){
            //获取title price size
            // title.innerText
            // price1.innerText
            // price2.innerText
            // qty.value
            var size = div.getElementsByClassName('active')[0];
            //size.innerHTML
            var arr = [];
            var obj = {};
            obj['imgurl']='../images/w_0.png';
            obj['title']=title.innerText;
            obj['price']=Number(price1.innerText.slice(2));
            obj['sale']=Number(price2.innerText.slice(2));
            obj['qty']=qty.value
            obj['guid']=size.innerHTML;
            arr[0]=obj;
            document.cookie = 'cartlist='+JSON.stringify(arr);
        }
        //tag标签页
        var tag_name = document.getElementsByClassName('tag_name')[0];
        var tag_main = document.getElementsByClassName('tag_main')[0];
        var lis = tag_name.getElementsByTagName('li');
        var lis2= tag_main.getElementsByTagName('li');
        var idx = 0
        for(var i=0;i<lis.length;i++){
            lis[i].idx=i
            lis[i].onclick = function(){
                for(var i=0;i<lis.length;i++){
                    lis[i].className = '';
                    lis2[i].className = '';
                }
                // console.log(this.idx);
                lis[this.idx].className = 'tag_checked';
                lis2[this.idx].className = 'tag_checked2';
            }
        }

};



        // tag_name.onclick=function(e){
        //     e = e||window.event;
        //     var target = e.target || e.srcElement;
        //     var lis = tag_name.getElementsByTagName('li');
        //     var lis2= tag_main.getElementsByTagName('li');

        //     //清楚所有类名
        //     for(var i=0;i<lis.length;i++){
        //         lis[i].className = '';
        //         lis2[i].className = '';
        //     }

        //     if(target.tagName=='LI'){  
        //     target.className = "tag_checked";
        //     target.
        //     }
        // }