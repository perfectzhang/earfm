<?php
header("Content-type:text/html;charset=utf-8");

function curl($url,$post_data){ //从网易云音乐读取数据
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL,$url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);

    $header =array(
        'Host: music.163.com',
        'Origin: http://music.163.com',
        'User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
        'Content-Type: application/x-www-form-urlencoded',
        'Referer: http://music.163.com/search/',
    );

    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    $src = curl_exec($curl);
    curl_close($curl);
    return $src;
}

@$types = $_POST['types']?$_POST['types']:$_GET['types'];  //api类型
switch($types)
{    
    case "download":    //下载歌曲
        @$filename = $_POST['url']?$_POST['url']:$_GET['url'];  //链接
        @$musicname = $_POST['name']?$_POST['name']:$_GET['name'];  //歌曲名字
        
        if(!$filename){
            $tempArr = array("code"=>-1,"msg"=>"歌曲链接为空");
            echojson(json_encode($tempArr));
        }else{
            header("Content-Type: application/force-download");
            header('Content-Disposition: attachment; filename="'.$musicname.'.mp3"');
            $mp3file = file_get_contents($filename); 
            echo $mp3file;
        }
        break;
    
    case "search":  //搜索歌曲
    default:
        @$s = $_POST['name']?$_POST['name']:$_GET['name'];  //歌名
        @$limit = $_POST['count']?$_POST['count']:$_GET['count'];  //每页显示数量
        @$pages = $_POST['OffSet']?$_POST['OffSet']:$_GET['OffSet'];  //页码
        if($pages>1000 || $pages<1)$pages=0;    //纠正错误的值
        if($limit == "") $limit = 20;
        @$offset= $pages;    //偏移量
        
        if(!$s){
            $tempArr = array("code"=>-1,"msg"=>"歌名为空");
            echojson(json_encode($tempArr));
        }else{
            $url= "http://music.163.com/api/search/pc";    //请求url
            $post_data = 'hlpretag=<span class="s-fc7">&hlposttag=</span>&s='. $s . '&type=1&offset='. $offset . '&total=true&limit=' . $limit;
            echojson(curl($url,$post_data));
        }   
}

function echojson($data)    
{
    @$callback = $_POST['callback']?$_POST['callback']:$_GET['callback'];
    if($callback != "") 
    {
        echo $callback."(".$data.")";
    }
    else
    {
        $data = str_replace("http://m", "http://p", $data);
        echo $data;
    }
}