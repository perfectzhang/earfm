<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<meta name="description" content="用心去聆听这个世界的声音|耳朵FM音乐">
<meta name="keywords" content="耳朵FM,耳朵FM音乐电台,云上的日子--FM电台,云上的日子电台,云上的日子音乐电台,耳朵,在线FM音乐电台,网易云外链网站"/>
    <title>耳朵FM音乐电台|强大的网易云外链|歌曲下载系统|外链获取工具</title>
 
 <script src="jquery.min.js"></script>
 
<script src="//cdn.bootcss.com/bootstrap/4.0.0-alpha/js/bootstrap.min.js"></script>
<link href="//cdn.bootcss.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css" rel="stylesheet"> 
 
 <link href="//cdn.bootcss.com/amazeui/2.7.2/css/amazeui.min.css" rel="stylesheet">
 <script src="//cdn.bootcss.com/amazeui/2.7.2/js/amazeui.min.js"></script>
 
 <link href="//cdn.bootcss.com/animate.css/3.1.1/animate.min.css" rel="stylesheet">
 
<script src="//cdn.bootcss.com/datatables/1.10.13/js/dataTables.bootstrap.min.js"></script>
<script src="//cdn.bootcss.com/datatables/1.10.13/js/jquery.dataTables.min.js"></script>
<link href="//cdn.bootcss.com/datatables/1.10.13/css/dataTables.bootstrap.min.css" rel="stylesheet">
 
 <script src="//cdn.bootcss.com/layer/3.0.1/layer.min.js"></script>
 
	<link rel="stylesheet" type="text/css" href="main.css" />
	<link rel="stylesheet" type="text/css" href="Cloud.css" />
	<link href="default.css" rel="stylesheet" />
	<script src="jaudio.js"></script>
	
   <script class="loadmoreRemove" type="text/javascript" src="Cloud.js"></script>
 <script src="jquery.goup.js"></script>

</head>
<body>

    <div style="height:354px; background-image: url(http://cn.bing.com/az/hprichbg/rb/PyramidsOfMeroe_ZH-CN10667861825_1920x1080.jpg); background-repeat:no-repeat;background-attachment:fixed;">

        <div class="animated fadeInDown">
            <div class="nav">
				<a href="http://www.ardorss.com">科学上网</a>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <a href="#" class="donation">获取源码</a>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <a href="https://blog.ardorss.com/" target="_blank">博客</a>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <a href="#" target="_blank">电台</a>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <a href="https://blog.ardorss.com/about.html" target="_blank">关于</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div id="title">
                耳朵FM音乐电台
            </div>
            <div class="min-title">
                <span style="font-size:20px">在线搜索全网音乐，支持一键获取歌曲外链、图片地址等</span><br />
                <span style="font-size:17px">其他功能正在添加中....</span>
            </div>

            <div style="width:100%; text-align:center; position:relative;top:80px">
                <input name = "pages" id="pages" type="text" value="1" hidden>
				<input type="text" onkeyup="ss()" id="txtSong" placeholder="请输入歌曲名称，例如： 周杰伦 王啸坤..." />
				<img src="./Images/search.png" id="btnSearch" />

            </div>
        </div>
    </div>


    <div>
        <table class="table table-striped table-bordered table-hover datatable">
            <thead>
                <tr>
                    <th>封面</th>
                    <th>歌手</th>
                    <th>歌名</th>
                    <th>专辑名</th>
                    <th>播放</th>
                    <th>添加列表</th>
                    <th>下载</th>
                    <th>外链</th>
                </tr>
            </thead>
            <tbody id="UserList"></tbody>
            <tr id="LoadMore" style="display:none;cursor:pointer" offset="0" search="0"><td colspan="8">点击加载更多</td></tr>
        </table>


        <div style="color:black; font-family:微软雅黑; font-size:14px; position:relative; top:80px;text-align:center">
            &copy; 2017-2018 耳朵FM  本站仅供交流学习使用 所有法律责任概不负责
        </div>
    </div>


    <div class="animated flipInY min-music" style="border:solid 0px red;width:400px; height:300px; ">

        <div class='jAudio--player'>

            <audio></audio>
            <div class='jAudio--ui'>
                <div class='jAudio--thumb'>
                </div>

                <div class='jAudio--status-bar'>

                    <div class='jAudio--details'></div>
                    <div class='jAudio--volume-bar'></div>

                    <div class='jAudio--progress-bar'>
                        <div class='jAudio--progress-bar-wrapper'>
                            <div class='jAudio--progress-bar-played'>
                                <span class='jAudio--progress-bar-pointer'></span>
                            </div>
                        </div>
                    </div>

                    <div class='jAudio--time'>
                        <span class='jAudio--time-elapsed'>00:00</span>
                        <span class='jAudio--time-total'>00:00</span>
                    </div>

                </div>

            </div>

            <div class='jAudio--playlist'>
            </div>

            <div class='jAudio--controls' style="background-color: #ECECEC;">
                <ul style="position: relative; top: 10px;">
                    <li><div class='btn' data-action='prev' id='btn-prev'><img src="Images/prev.png" style="width:40px" /></div></li>
                    <li><div class='btn' data-action='play' id='btn-play'><img src="Images/play.png" style="width:40px" class="PlayerState" /></div></li>
                    <li><div class='btn' data-action='next' id='btn-next'><img src="Images/next.PNG" style="width:40px" /></div></li>
                </ul>
            </div>

        </div>
        <div class="player-min"></div>
    </div>
    <div class="link-web" style="width:100%; text-align:center; display:none">
        <div style="width:92%; margin:auto;<!-- position:relative;top:20px-->">
            <p>你的浏览器不支持直接复制，请在以下输入框手动复制：</p>
            <input type="text" class="link-music am-form-field am-radius" />
            <br />
            <button onclick="javascript:layer.closeAll()" class='am-btn  am-btn-warning am-radius OutLink' style='background-color:#00B38C; border-color:#00B38C; float:right'><i class='am-icon-paint-brush'></i>&nbsp;确定</button>
        </div>
    </div>

    <script src="notie.js"></script>
  <script type="text/javascript">
        function ss() {
            if ($("#txtSong").val().length >= 2) {
                $("#btnSearch").click();
            }
        }
    </script>
<script type="text/javascript">console.log('%c耳朵FM音乐电台\n%chttp://fm.ardorss.com/\n\n%c', 'font-family: "微软雅黑";color:#3AAFFF; font-size: 35px;', 'color:#3AAFFF', 'color:#000;font-size: 20px;');</script>

<script src="https://s4.cnzz.com/z_stat.php?id=1259026654&web_id=1259026654" language="JavaScript"></script>
</body>

</html>