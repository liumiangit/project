/* 
* @Author: Marte
* @Date:   2017-08-07 09:32:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-07 19:42:53
*/
// 第二周~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            var xfooter=document.getElementsByClassName('xfooter_2')[0];

            for(var i=1;i<13;i++){
            var img=document.createElement('img');
            var xu_a=document.createElement('a');
                xfooter.appendChild(xu_a);
                xu_a.href='#';
                xu_a.appendChild(img);
                img.src='../images/xu'+i+'.png'
                // img.src="../images/xu1.png"
            }
            var xuarr = [
            {
                name:'Up&Down Open Cowhide Leather Case with Crocodole...',
                price:4998,
                color:'土豪金',
                memory:64,
                imgurl:'../images/left_1.png'
            },
            {
                name:'sansumg爆炸7',
                price:998,
                color:'白色',
                memory:32,
                imgurl:'../images/left_2.png'
            },
            {
                name:'荣耀7',
                price:1999,
                color:'白色',
                memory:16,
                imgurl:'../images/left_3.png'
            }
        ];
            var xleft_2=document.getElementsByClassName('shangping_right')[0];
                for(var i=0;i<xuarr.length;i++){
                
                var xuul=document.createElement('ul');
                xleft_2.appendChild(xuul);
                xuul.className='xuleft';
                // xuul.style.width=200+'px';
                // xuul.style.height=240+'px';

                
                xuul.innerHTML='<a href="#"><img src="'+xuarr[i].imgurl+'"></a><p>'+xuarr[i].name+'</p></a><p>原价:<span class="xtejia">'+xuarr[i].price+'</span></p></a><p>颜色：'+xuarr[i].color+'</p></a><p>现价：'+xuarr[i].memory+'</p>'


            }
// 第三周~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            var submit=document.getElementById('xu_tijiao');
            var xuxiao=document.getElementById('xuxiao');
            var myname=document.getElementById('xu_name');
            var pinglun_left=document.getElementsByClassName('pinglun_left');
            var pinglun_right=document.getElementsByClassName('pinglun_right');
            // var timer=pinglun_left.children[1];
            // var name=pinglun_left.children[2];
            // var neirong=pinglun_right[0];
            var minggan=['你妹','习近平','操'];
            var xu_pinglun=[{
                'name':'test1',
                'neirong':'Verv nice the casual shirt,is equal to the photo on the web,arrived on time,in excellent conditon,I recommend.negative:no trademark',
                'time':'07/11/2012',
                'iddx':'4'
            },
            {
                'name':'test2',
                'neirong':'Verv nice the casual shirt,is equal to the photo on the web,arrived on time,in excellent conditon,I recommend.negative:no trademark',
                'time':'07/11/2012',
                'iddx':'4'
            },
            {
                'name':'test3',
                'neirong':'Verv nice the casual shirt,is equal to the photo on the web,arrived on time,in excellent conditon,I recommend.negative:no trademark',
                'time':'07/11/2012',
                'iddx':'4'
            },
            {
                'name':'test4',
                'neirong':'Verv nice the casual shirt,is equal to the photo on the web,arrived on time,in excellent conditon,I recommend.negative:no trademark',
                'time':'07/11/2012',
                'iddx':'4'
            }
            ];
            console.log(xu_pinglun);

            function shucu(){
                var ii=-1;
            xu_pinglun.forEach(function(item){
                ii++
                var xiaoxingxing=pinglun_left[ii].children[0].children;
                for(var j=0;j<5;j++){
                    xiaoxingxing[j].className='xiaoxingxing';
                }

                for(var i=0;i<=item.iddx;i++){
                    xiaoxingxing[i].className='xiaoxingxing2'
                }
                console.log(xiaoxingxing);
                     
                pinglun_left[ii].children[1].innerText=item.time;
                pinglun_right[ii].children[0].innerText=item.neirong;
                pinglun_left[ii].children[2].innerText=item.name;
            })
            }
            shucu();
            
            var yanzheng=document.getElementById('yanzheng')
            var yanzhengma=document.getElementById('yanzhengma');
            var rss=vCode()
            yanzhengma.innerText=rss;
            console.log(yanzheng)

            
            // 点击提交数据录入数组中
            submit.onclick=function(){
                var _yanzheng=yanzheng.value;
                if(_yanzheng!=rss){
                return alert('请输入正确的验证码');  
            }
                var _xuxiao=xuxiao.value;
                var _myname=myname.value;
                var now=new Date();
                var year=now.getFullYear();
                var month=now.getMonth()+1;
                var date=now.getDate();
                minggan.forEach(function(item){
                    
                        var reg=new RegExp(item, 'gi');
                        _xuxiao=_xuxiao.replace(reg,'**');
                    
                    
                })
                if(date<10){date= '0' + date;}
                if(month<10){month= '0' + month};
                var times=date+'/'+month+'/'+year;
                var pinglun={
                    name:_myname,
                    neirong:_xuxiao,
                    time:times,
                    iddx:suoyin

                };
                xu_pinglun.unshift(pinglun);
                console.log(xu_pinglun);
                xu_pinglun.pop();
                shucu();      
                alert('评论成功！')
                console.log('是'+suoyin);
                // 过滤敏感词汇


                
            }
            // 验证码vCode();
            var xingxing=document.getElementsByClassName('xx')[0].children[0].children;
            for(var i=0;i<xingxing.length;i++){

                xingxing[i].className="xingxing2"
            }
            xingxing[0].parentNode.onmouseover=function(e){

                if(e.target.tagName==='I'){
                    var iddx=e.target.getAttribute('data-iddx');
                    
                    for(var i=0;i<=iddx;i++){

                        xingxing[i].className="xingxing"
                    }
                }           
            }
            
            
            xingxing[0].parentNode.onmouseout=function(e){

                if(e.target.tagName==='I'){
                    var iddx=e.target.getAttribute('data-iddx');
                    xingxing[iddx].className='xingxing2';
                }
            }
            var suoyin=0;
            xingxing[0].parentNode.onclick=function(e){
                xingxing[0].parentNode.onmouseout=null;
                xingxing[0].parentNode.onmouseover=null;
                // 点击的时候把颜色变为初始样式，然后再判断条件进行变色
                for(var i=0;i<5;i++){

                        xingxing[i].className="xingxing2";
                    }
                if(e.target.tagName==='I'){
                    var iddx=e.target.getAttribute('data-iddx');
                    suoyin=iddx;
                    console.log(iddx);
                    for(var i=0;i<=iddx;i++){

                        xingxing[i].className="xingxing"
                    }

                }
            }
            
            
        
