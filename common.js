/* 
* @Author: liumian
* @Date:   2017-08-04 18:56:20
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-12 09:44:34
*/

function randomNumber(num1,num2){
    return parseInt(Math.random()*(num2-num1+1)+num1);
}
function randomColor(){
    var r = randomNumber(0,255);
    var g = randomNumber(0,255);
    var b = randomNumber(0,255);
    var res = 'rgb('+r+','+g+','+b+')';//整个是一个字符串拼接起来的
    return res;
}
function squar(num1,num2){
    var total = 1;
    for(var i=1;i<=num2;i++){
        total*=num1;
    }
    return total;
}
function getMax(str){
    var strs = new Array();
    strs = str.split(',');
    for(var j=1;j<=strs.length;j++){
        for(var i=0;i<strs.length;i++){
        var num;
        if(Number(strs[i])<Number(strs[i+1])){
            num = strs[i];
           strs[i] = strs[i+1]
            strs[i+1]= num;
        }
    }
}
    return strs[0];
}
/*获取当前元素的上一个元素*/
function getPreviousElement(ele){
    var res= ele.previousSibling;
    if(res && res.nodeType != 1){
        res = res.previousSibling;
    }
    return res;
}
/*获取当前元素的一下个元素*/
function getNextElement(ele){
    var res = ele.nextSibling;
    if(res && res.nodeType!=1){
        res = res.nextSibling;
    }
    return res;
}
/*获取子节点中的元素*/
function getElementsChildNode(ele){
    var res=[];
    var arr = ele.childNodes;
    for(var i=0;i<arr.length;i++){
        if(arr[i].nodeType == 1){
            res.push(arr[i]);
        }
    }
    return res;
}
/*获取第一个子元素*/
function getElementsFirstChild(ele){
    var res=[];
    var arr = ele.childNodes;
    for(var i=0;i<arr.length;i++){
        if(arr[i].nodeType == 1){
            res.push(arr[i]);
        }
    }
    return res[0];
}
/*获取最后一个子元素*/
function getElementslastChild(ele){
    var res=[];
    var arr = ele.childNodes;
    for(var i=0;i<arr.length;i++){
        if(arr[i].nodeType == 1){
            res.push(arr[i]);
        }
    }
    return res[res.length-1];
}
/*
/*ie8-通过类名获取元素*/
function getElementsByClassName(className,ele){
    var res=[];
    if(!ele){
        ele = document;
    }
    if(ele.getElementsByClassName){
        res = ele.getElementsByClassName(className);
        return res;
    }
    var arr=[];
    arr = ele.getElementsByTagName('*');
    for(var i=0;i<arr.length;i++){
        if(arr[i].indexOf(className)>=0){
            res.push(arr[i]);
        }       
    }
    return res;
}
/*
 获取css样式，兼容ie8-
 */
function getCss(ele,attr){
    // 判断浏览器是否支持getComputedStyle
    if(window.getComputedStyle){
        return getComputedStyle(ele)[attr];
    }

    // ie8-
    else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }

    // 返回内联样式
    else{
        return ele.style[attr];
    }

}
/*
 利用对象封装cookie
    *set        添加
    *get        查找
    *remove     删除
 */
var cookie = {
    //创建cookie
    set:function(name,val,expires,path){

        var cookieStr = name +'='+val;
        //如果存在截至日期
        if(expires){
            cookieStr += ';expires = '+expries.toString();
        }
        //如果存在路径
        if(path){
            cookieStr += ';path = '+path;
        }
        document.cookie = cookieStr;
    },
    //获取cookie，得到字符串
    get:function(name){
        //获取所有cookie
        var cookies = document.cookie;
        //判断cookie是否为空
        if(cookies.length === 0){
            return '';
        }
        //如果cookie不为空，则把其转化为数组
        var arr_cookie = cookies.split('; ');
        var res = '';
        arr_cookie.forEach(function(item){
            var arr = item.split('=');
            if(arr[0]==name){
                res = arr[1];
            }
        })
        return res;
    },
    remove:function(name){
        var now = new Date();
        now.setDate(now.getDate()-7);
        document.cookie = name + '=xxx;expires='+now.toUTCString();
    }
}
function animate(ele,opt,callback){
    //遍历属性，返回的是属性名
    var attrQty=0;
    // 通过判断达到目标值的次数等于属性个数来确定是否所有变化都完成，为了知道对象的属性个数，把对象遍历加入到一个空数组中，那么那个数组的长度就是对象的属性个数了，每一次达到目标值，就给一个数加一，当那个数等于所有属性个数的时候，就是所有变化完成的时候，那么就可以执行callback了
    for(var attr in opt){
        createTimer(attr);
        attrQty++;
    }

    function createTimer(attr){
        // 根据属性定义定时器名字，属性名+timer避免同名冲突
        var timerName = attr + 'timer';

        // 获取目标值
        var target = opt[attr];
        // 开始就获取目标值
        // 变量要用[]

        clearInterval(ele[timerName]);
        // 给节点绑定timerName，便于关闭定时器
        ele[timerName] = setInterval(function(){
            // 获取当前值
            var current = getCss(ele,attr);//10px,0.5,20em,2.4rem,40deg
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
            var speed = (target-current)/10;
            // 速度等于目标值减去当前值
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            // 如果为正，像上取整，如果为负，向下取整

            // 针对opacity属性计算速度
            if(attr === 'opacity'){
                speed = speed>0 ? 0.01 : -0.01;

            }

            // 到达目标值后清除动画定时器
                current = Math.ceil(current);
            if(current === target || speed === 0){
                clearInterval(ele[timerName]);

                // 重置目标值
                current = target - speed;

                attrQty--;
                // 执行回调函数
                 if(attrQty===0 && typeof callback == 'function'){
                    callback();
                }
                
            }

            ele.style[attr] = current + speed + unit;
        },30);
    }
}