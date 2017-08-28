<?php
	$file_url = '../json/register.json';
	$myfile = fopen($file_url,'r') or die ("文件打不开");
	$content = fread($myfile,filesize($file_url));

	$username = $_GET['username'];
	/*$password = $_GET['password'];*/

	$arr_data = json_decode($content,JSON_UNESCAPED_UNICODE);

	/*var_dump($arr_data);
	var_dump($username);*/

	/*$arr_obj = array(
			"username"=>$username
	);*/
	$arr_res = array($username/*,$password*/);

	/*var_dump($arr_res);
	var_dump($arr_data);*/


	if(in_array($arr_res,$arr_data)){
		echo false;
		fclose($myfile);
	}else{
		fclose($myfile);
		$myfile = fopen($file_url,'w') or die ("文件打不开打不开");
		$arr_data[] = $arr_res;
		/*$res = array_merge((array)$arr_obj,(array)$arr_date,JSON_UNESCAPED_UNICODE);*/
		fwrite($myfile,json_encode($arr_data,JSON_UNESCAPED_UNICODE));
		//echo json_encode($res,JSON_UNESCAPED_UNICODE);
		echo true;
		fclose($myfile);
	}
?>