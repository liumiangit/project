/* 
* @Author: Marte
* @Date:   2017-08-05 11:32:33
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-26 16:36:50
*/

document.addEventListener('DOMContentLoaded',function(){
        var arr = [
            {
                "imgurl":"../images2/img1.png",
                "title":"Fashion Men's suit",
                "price":200.20,
                "sale":150.12,
                "guid":"g01",
                "qty":2
            },
            {
                "imgurl":"../images2/img2.png",
                "title":"Fashion Men's suit",
                "price":400.30,
                "sale":350.24,
                "guid":"g02",
                "qty":2
            },
            {
                "imgurl":"../images2/img3.png",
                "title":"Fashion Men's suit",
                "price":270.40,
                "sale":180.38,
                "guid":"g03",
                "qty":2
            },
            {
                "imgurl":"../images2/img4.png",
                "title":"Fashion Men's suit",
                "price":290.23,
                "sale":230.67,
                "guid":"g04",
                "qty":2
            }                
        ];
        var hotlist = [
            {
                "imgurl":"../images2/hot_1.png",
                "title":"Louis Vuitton Monogranm verjh",
                "price":2455.00,
                "sale":2100.00, 
                "guid":"g1"
            },
            {
                "imgurl":"../images2/hot_2.png",
                "title":"Louis Vuitton Monogranm verjh",
                "price":289.00,
                "sale":240.00 ,
                "guid":"g2"               
            },
            {
                "imgurl":"../images2/hot_3.png",
                "title":"Louis Vuitton Monogranm verjh",
                "price":2223.00,
                "sale":2123.00,
                "guid":"g3"                
            },
            {
                "imgurl":"../images2/hot_4.png",
                "title":"Louis Vuitton Monogranm verjh",
                "price":1536.00,
                "sale":1234.00 ,
                "guid":"g4"               
            },
            {
                "imgurl":"../images2/hot_5.png",
                "title":"Louis Vuitton Monogranm verjh",
                "price":1490.00,
                "sale":1123.00,
                "guid":"g5"              
            },
            {
                "imgurl":"../images2/hot_6.png",
                "title":"Louis Vuitton Monogranm verjh",
                "price":1683.00,
                "sale":1400.00 ,
                "guid":"g6"              
            }
        ];
        var mb = document.getElementsByClassName('mb')[0];
        var hot = document.getElementsByClassName('hot')[0];
        // $mb = $('.mb');
        // $hot = $('.hot');
        var now = new Date();
        now.setDate(now.getDate()+10);
        addhot(hotlist);
        // addcar(arr);
        //获取cookie内的内容
        var arr_goodslist = arr;
        if(cookie.get('cartlist')!=''){
            arr_goodslist = JSON.parse(cookie.get('cartlist'));  
        }
        addcar(arr_goodslist);
        //点击删除商品
        mb.onclick = function(e){
        // $mb.on('click',function(e){
            var e=e||window.event;
            var target = e.target||e.srcElement;
            if(target.className == 'delbtn'){
                var guid = target.parentNode.parentNode.getAttribute('data-guid');
                arr_goodslist.forEach(function(item,idx){
                    if(item.guid==guid){
                        arr_goodslist.splice(idx,1);
                        return;
                    }                
                })
                //删除后的cookie覆盖               
                addcar(arr_goodslist);
            }
        // $mb.on('click','.delbtn',function(){
        //     var $guid = $(this).parent().parent().attr('data-guid');
        //     $(arr_goodslist).each(function(idx,item){
        //         if($(item).guid==$guid){
        //             $(arr_goodslist).splice(idx,1);

        //             return;
        //         }
        //     })
        //     addcar(arr_goodslist);
        // })
        //商品数量加减,利用事件绑定
            // var qty = document.getElemntsByClassName('qty')[0];
            if(target.className=='jian'){
               var guid = target.parentNode.parentNode.getAttribute('data-guid');
               arr_goodslist.forEach(function(item,idx){      
                if(item.guid==guid){
                    if(item.qty>0){
                    item.qty--;
                    }
                    if(item.qty==0){
                        arr_goodslist.splice(idx,1);
                    }                                
                }
               })
               addcar(arr_goodslist);
           }
               if(target.className=='jia'){
               var guid = target.parentNode.parentNode.getAttribute('data-guid');
               arr_goodslist.forEach(function(item){
                if(item.guid==guid){
                    item.qty++;
                }
               })
               addcar(arr_goodslist);
            }
        }
        //给添加到购物车按钮绑定事件
         hot.onclick = function(e){
            var e=e||window.event;
            var target = e.target||e.srcElement;
            if(target.className==='addtocar'){
                console.log(666);
                var tarli = target.parentNode;
                var guid = tarli.getAttribute('data-guid');
                for(var i=0;i<arr_goodslist.length;i++){
                    if(arr_goodslist[i].guid==guid){
                       arr_goodslist[i].qty++;
                       break; 
                    }
                }
                if(i===arr_goodslist.length){
                  var arr_h ={
                    imgurl:tarli.children[0].src,
                    title:tarli.children[1].innerText,
                    price:tarli.children[2].children[0].innerText,
                    sale:tarli.children[2].children[1].innerText,
                    guid:guid,
                    qty:1
                  }
                  arr_goodslist.push(arr_h);
                }
               addcar(arr_goodslist);
            }

            //给左边滑动按钮绑定事件
            if(target.className=='arr_l'){
                hotlist.push(hotlist.shift());
                hot.innerHTML = '';
                addhot(hotlist);
            }
            //给右滑动按钮绑定事件
            if(target.className=='arr_r'){
                hotlist.unshift(hotlist.pop());
                hot.innerHTML = '';
                addhot(hotlist);
                 }
         }
         //手动输入数量

         mb.oninput = function(e){
            e=e||window.event;
            var target = e.target;
            if(target.className == 'changeqty'){
            var tarli = target.parentNode.parentNode;
            var guid = tarli.getAttribute('data-guid');
            arr_goodslist.forEach(function(item){
                if(item.guid == guid){
                    item.qty=target.value;
                }
            })
            setTimeout(addcar(arr_goodslist),100);
        }
        } 
        
        //将商品数组写入购物车函数
        function addcar(arr){
            var total = 0;
            var cuttotal=0;
            var ul = document.createElement('ul');
            var jiage = document.getElementsByClassName('jiage')[0];
            ul.innerHTML = arr.map(function(item){
                total+=item.sale*item.qty;
                cuttotal+=item.price*item.qty;
                return '<li data-guid='+item.guid+'>'
                +  '<img src="'+item.imgurl+'">'
                +'<div class="title"><p>'+item.title+'</p><p>ID:'+item.guid+'</p></div>'       
                +'<div class="qty"><span class="jian">-</span><span><input class="changeqty" type="text" value='+item.qty+'>'+'</input></span><span class="jia">+</span></div>'
                +'<div class="price"><p>'+item.price+'</p><p>'+item.sale+'</p></div>'
                +'<div class="total"><p>'+item.sale*item.qty+'</p><p>You save'+(item.price*item.qty-item.sale*item.qty).toFixed(2)+'</p></div>'
                +'<div class="deldiv"><button class="delbtn">&times;</button></div>'
                +'</li>'
            }).join('')           
            jiage.children[0].children[0].innerHTML = total;
            jiage.children[1].children[0].innerHTML = (cuttotal-total).toFixed(2);
            document.cookie = 'cartlist='+JSON.stringify(arr_goodslist)+';expires='+now.toUTCString();
            mb.innerHTML = '';
            mb.appendChild(ul);
        }
        //将热门数组写入热门栏
        function addhot(arr){
            var span1 = document.createElement('span');
            span1.className = 'arr_l';
            var span2 = document.createElement('span');
            span2.className = 'arr_r';
            var ul = document.createElement('ul');
            ul.innerHTML = arr.map(function(item){
                return '<li data-guid="'+item.guid+'">'
                +'<img src="'+item.imgurl+'">'
                    +'<p class="p_title">'+item.title+'</p>'
                    +'<p class="p_price"> <span>'+item.price.toFixed(2)+'</span><span>'+item.sale.toFixed(2)+'</span> </p>'
                    + '<span class="addtocar">Add to <i></i> </span>'
                    +'</li>'
            }).join('');
            hot.appendChild(span1);
            hot.appendChild(ul);
            hot.appendChild(span2);
        }
        //检查cookie内是否存在热门商品
        // var addtocar = document.getElementsByClassName('addtocar')[0];
        // var hotlist = document.cookie;
        // var arr_hot = [];
        // if(hotlist.length>0){
        //     hotlist = hotlist.split(';');
        //     hotlist.forEach(function(item){
        //         var arr = item.split('=');
        //         if(arr[0]=='hotlist'){
        //             arr_hot = arr[1];
        //         }
        //     })
        // }
        
         //将热门商品写入购物车
    //     if(cookie.get('hotlist')!=''){
    //         var arr_hotlist = JSON.parse(cookie.get('hotlist'));
    //      }
    //      addcar(arr_hotlist);
 })