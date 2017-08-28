var left = document.querySelector('.s_left');
var round = document.querySelector('.s_round');
var text = left.querySelectorAll('input');
var login = left.querySelector('.s_in');

var cookies = document.cookie;
var arr3 = [];
if(cookies.length>0){
	var cookies = cookies.split('; ');
	cookies.forEach(function(item){
		var res = item.split('=');
		if(res[0] == 'user'){
			if(res[1]!=='xxx'){
				window.location.href = '../index.html';
				/*arr3 = JSON.parse(res[1]);*/
			}
		}
		console.log(arr3);
	})

}

function xx(){
	var shu = parseInt(Math.random()*10000);
	round.innerHTML = shu;
}
xx();
round.onclick = function(){
	xx();
}

var flag=false,flag1=false,flag2=false;

text[0].onblur = function(){
	var email = this.value;
	var reg = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
	if(!reg.test(email)){
		this.style.border = 'red solid 1px';
		flag1 = false;
	}else if(reg.test(email)){
		this.style.border = '#CCCCCC solid 1px';
		flag1 = true;
	}
}
text[1].onblur = function(){
	var psw = this.value;
	var reg = /^\S{6,19}$/;
	if(!reg.test(psw)){
		this.style.border = 'red solid 1px';
		flag2 = false;
	}else if(reg.test(psw)){
		this.style.border = '#CCCCCC solid 1px';
		flag2 = true;
	}
}

login.onclick = function(){
	var email = text[0].value;
	var psw = text[1].value;
	var now = new Date();
	var arr_user = [];
	var user = {
		email:email,
		psw:psw
	}
	arr_user.push(user);
    now.setDate(now.getDate()+7);
	document.cookie = 'user=' + JSON.stringify(arr_user) + ';expires=' + now.toString() + ';path=/';
    //document.cookie = 'psw=' + psw + ';expires=' + now.toString();

	if(text[2].value == round.innerText){
		var flag = true;
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
			console.log(xhr.responseText);
			var res = xhr.responseText;
			if(res == false && flag == true && flag1 == true && flag2 == true){
				window.location.href = '../index.html';
			}else{
				alert('邮箱、密码或验证码有误');
			}
		}
	}
	xhr.open('get','../php/register.php?username='+email,true);
	xhr.send(null);
}





var right = document.querySelector('.s_right');
var input = right.querySelectorAll('input');
var register = right.querySelector('.s_btn');
var flag1=false,flag2=false,flag3=false,flag4=false,flag5=false;

input[0].onblur = function(){
	var email = this.value;
	var reg = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
	if(!reg.test(email)){
		this.style.border = 'red solid 1px';
		flag1 = false;
	}else if(reg.test(email)){
		this.style.border = '#CCCCCC solid 1px';
		flag1 = true;
	}
}
input[1].onblur = function(){
	var psw = this.value;
	var reg = /^\S{6,19}$/;
	if(!reg.test(psw)){
		this.style.border = 'red solid 1px';
		flag2 = false;
	}else if(reg.test(psw)){
		this.style.border = '#CCCCCC solid 1px';
		flag2 = true;
	}
}
input[2].onblur = function(){
	var cpsw = this.value;
	var psw = input[1].value;
	if(cpsw !== psw){
		this.style.border = 'red solid 1px';
		flag3 = false;
	}else{
		this.style.border = '#CCCCCC solid 1px';
		flag3 = true;
	}
}

register.onclick = function(){
	if(input[3].checked && input[4].checked){
		flag4 = true;
		flag5 = true;
	}else{
		flag4 = false;
		flag5 = false;
	}
	//console.log(flag1,flag2,flag3,flag4,flag5);
	if(flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true){
		var xml = new XMLHttpRequest();
		xml.onreadystatechange = function(){
			if(xml.readyState === 4 && (xml.status === 200 || xml.status === 304)){
				var res = xml.responseText;
				console.log(res);
				if(res == false){
					alert('邮箱已注册');
				}else{
					alert('注册成功，请登录');
					input.forEach(function(item){
						item.value = '';
					})
				}
			}
		}
		var name = input[0].value;
		//var cpsw = input[2].value;
		xml.open('get','../php/register.php?username='+name,true);
		xml.send(null);
	}
}
