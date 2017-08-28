<?php
    //获取数据
    $pageNum = isset($_GET['pageNum'])?$_GET['pageNum']:1;
    $pageQty = isset($_GET['pageQty'])?$_GET['pageQty']:20;
    $type = isset($_GET['type'])?$_GET['type']:null;
    //打开文件,
    $myfile = fopen('data/goods.json','r');
    $content = fread($myfile,filesize('data/goods.json'));
    //读取到的字符串,转成关联数组
    $arr = json_decode($content,true);
    if($type==='null'){
/*
    pageQty:20
    pageNum                     从哪里开始                   截取个数
       1            0~19    ($pageNum-1)*$pageQty   ~       $pageQty
       2            20~39       20~                             20
       3            40~59          
*/
    $res = array(
        'data'=>array_slice($arr,($pageNum-1)*$pageQty,$pageQty),
        'total'=>count($arr)
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    fclose($myfile);

    }  else if($type==='true'){//降序
        foreach($arr as $val){
            $new_arr[]=$val['num'];
        }
        array_multisort($new_arr,SORT_DESC,SORT_NUMERIC,$arr);
        $res = array(
            'data'=>array_slice($arr,($pageNum-1)*$pageQty,$pageQty),
            'total'=>count($arr)
        );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        fclose($myfile);
    }   else if($type==='false'){//升序
        foreach($arr as $val){
            $new_arr[]=$val['num'];
        }
        array_multisort($new_arr,SORT_ASC,SORT_NUMERIC,$arr);
        $res = array(
            'data'=>array_slice($arr,($pageNum-1)*$pageQty,$pageQty),
            'total'=>count($arr)
        );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        fclose($myfile);
    }
?>
