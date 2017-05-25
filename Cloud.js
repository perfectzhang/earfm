$(document).ready(function() {
	$("#btnSearch").click(function() {
		if ($("#LoadMore").attr("Search") == "0") {
			$("#UserList").html("");
			$(".datatable").removeClass("animated fadeInDown");
			$("#LoadMore").attr("offset", "0")
		}
		var Song = $("#txtSong").val();
		$.ajax({
			url: "/api.php",
			data: {
				name: Song,
				OffSet: $("#LoadMore").attr("offset")
			},
			type: "POST",
			success: function(msg) {
				var SongJson = JSON.parse(msg);
				if (typeof SongJson.result.songs == undefined || typeof SongJson.result.songs == "undefined") {
					$("#LoadMore").show();
					$("#LoadMore td").text("对不起，没有更多数据了")
				} else {
					for (var i = 0; i < SongJson.result.songs.length; i++) {
var mp3Url = SongJson.result.songs[i].mp3Url; //获取音乐链接
var picUrl = SongJson.result.songs[i].album.blurPicUrl; //获取音乐图片
var songName = SongJson.result.songs[i].name.substring(0, 20); //歌名
var singerName = SongJson.result.songs[i].artists[0].name; //歌手的名字(歌手名）

$("#UserList").append("<tr><td style='margin: 0px;padding: 3px; width:80px'><img class='songImg' src='" + picUrl + "'/></td><td>" + singerName + "</td><td style='width:40%'>" + songName + "</td><td>" + SongJson.result.songs[i].album.name.substring(0, 20) + "</td><td><button  class='am-btn am-btn-primary am-radius BeginPlay'  url='" + mp3Url + "'   aid='" + SongJson.result.songs[i].album.id + "' mid='" + SongJson.result.songs[i].id + "' img='" + picUrl + "' album='" + SongJson.result.songs[i].album.name.substring(0, 20) + "' singer='" + singerName + "' name='" + songName + "'><i class='am-icon-play'></i>&nbsp播放</button></td><td><button   url='" + mp3Url + "'  class=' AddMusic am-btn am-btn-success am-radius'     aid='" + SongJson.result.songs[i].album.id + "' mid='" + SongJson.result.songs[i].id + "' img='" + picUrl + "' album='" + SongJson.result.songs[i].album.name.substring(0, 20) + "' singer='" + singerName + "' name='" + songName + "'><i class='am-icon-plus'></i>&nbsp;添加</button></td><td><a target='_blank' href='api.php?types=download&url=" + mp3Url + "&name=" + songName + "-" + singerName + "' ><button  class='am-btn am-btn-warning am-radius' ><i class='am-icon-arrow-down'></i>&nbsp;下载</button></a></td><td><button  class='am-btn  am-btn-warning am-radius OutLink'  url='" + mp3Url + "'   style='background-color:#00B38C; border-color:#00B38C'><i class='am-icon-slack'></i>&nbsp;外链</button></td></tr>");
$(".datatable").addClass("animated fadeInDown");
					$("#LoadMore").show();
					$("#LoadMore td").text("点击加载更多数据")
					}
				}
				$("#LoadMore").attr("Search", "0");
				$("#LoadMore").click(function() {
					var Tr_Length = $("#UserList tr").length;
					$(this).attr("offset", Tr_Length);
					$("#LoadMore").attr("Search", "1");
					$("#btnSearch").click();
					$("#LoadMore").unbind("click")
				});
				$(".BeginPlay").each(function() {
					if ($(this).attr("url") == "http://p2.music.126.net/hmZoNQaqzZALvVp0rE7faA==/0.mp3") {
						var aid = $(this).attr("aid");
						var mid = $(this).attr("mid");
						$.ajax({
							url: "./api.php",
							data: {
								id: aid
							},
							type: "POST",
							success: function(json) {
								json = JSON.parse(json);
								for (var k = 0; k < json.album.songs.length; k++) {
									if (json.album.songs[k].id == mid) {
										$("button[mid='" + mid + "']").attr("url", json.album.songs[k].mp3Url);
										$("td[mid='" + mid + "']").text(json.album.songs[k].mp3Url);
										$("a[mid='" + mid + "']").attr("href", json.album.songs[k].mp3Url);
										break
									}
								}
							}
						})
					}
				});
				$(".BeginPlay").click(function() {
					$(".jAudio--player").jAudio(t);
					var url = $(this).attr("url");
					var same = false;
					$(".jAudio--playlist-item").each(function() {
						if ($(this).attr("data-track") == url) {
							same = true;
							$(this).click();
							var container = $(".jAudio--playlist"),
								scrollTo = $(this);
							container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
							OpenPlayer();
							return false
						}
					});
					if (same == false) {
						var MusicFile = new Object();
						MusicFile.file = $(this).attr("url");
						MusicFile.thumb = $(this).attr("img");
						MusicFile.trackName = $(this).attr("name");
						MusicFile.trackArtist = $(this).attr("singer");
						MusicFile.trackAlbum = $(this).attr("album");
						t.playlist.push(MusicFile);
						$(".jAudio--player").jAudio(t);
						OpenPlayer();
						$(".jAudio--playlist-item").last().click();
						localStorage["PlayerList"] = JSON.stringify(t);
						var container = $(".jAudio--playlist"),
							scrollTo = $(".jAudio--playlist-item").last();
						container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
						$(".jAudio--playlist-item").hover(function() {
							$(this).find(".del").removeClass("fadeOutUp");
							$(this).find(".del").addClass("fadeInDown")
						}, function() {
							$(this).find(".del").removeClass("fadeInDown");
							$(this).find(".del").addClass("fadeOutUp")
						});
						$(".del").unbind("click");
						$(".del").click(function() {
							$(this).parent().parent().remove();
							var u = $(this).attr("delurl");
							for (var i = 0; i < t.playlist.length; i++) {
								if (t.playlist[i].file == u) {
									t.playlist.splice(i, 1);
									localStorage["PlayerList"] = JSON.stringify(t);
									return
								}
							}
						})
					}
				});
				$(".AddMusic").click(function() {
					var url = $(this).attr("url");
					var same = false;
					$(".jAudio--playlist-item").each(function() {
						if ($(this).attr("data-track") == url) {
							same = true;
							var container = $(".jAudio--playlist"),
								scrollTo = $(this);
							container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
							OpenPlayer();
							notie.alert(1, "添加失败，该歌曲已在列表中了。", 2);
							return false
						}
					});
					if (same == false) {
						var MusicFile = new Object();
						MusicFile.file = $(this).attr("url");
						MusicFile.thumb = $(this).attr("img");
						MusicFile.trackName = $(this).attr("name");
						MusicFile.trackArtist = $(this).attr("singer");
						MusicFile.trackAlbum = $(this).attr("album");
						t.playlist.push(MusicFile);
						$(".jAudio--playlist").append('<div class="jAudio--playlist-item" data-track="' + MusicFile.file + '"><div class="jAudio--playlist-thumb"><img src="' + MusicFile.thumb + '"></div><div class="jAudio--playlist-meta-text"><h4>' + MusicFile.trackName + "</h4><p>" + MusicFile.trackArtist + '</p> <img src="./Images/del.png" class="del animated fadeOutUp" delurl="' + MusicFile.file + '"  /></div></div>');
						OpenPlayer();
						localStorage["PlayerList"] = JSON.stringify(t);
						var container = $(".jAudio--playlist"),
							scrollTo = $(".jAudio--playlist-item").last();
						container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
						$(".jAudio--playlist-item").hover(function() {
							$(this).find(".del").removeClass("fadeOutUp");
							$(this).find(".del").addClass("fadeInDown")
						}, function() {
							$(this).find(".del").removeClass("fadeInDown");
							$(this).find(".del").addClass("fadeOutUp")
						});
						$(".del").unbind("click");
						$(".del").click(function() {
							$(this).parent().parent().remove();
							var u = $(this).attr("delurl");
							for (var i = 0; i < t.playlist.length; i++) {
								if (t.playlist[i].file == u) {
									t.playlist.splice(i, 1);
									localStorage["PlayerList"] = JSON.stringify(t);
									return
								}
							}
						})
					}
				});
				$(".OutLink").unbind("click");
				$(".OutLink").click(function() {
					var link = $(this).attr("url");
					layer.open({
						type: 1,
						title: "获取歌曲外链",
						maxmin: true,
						area: ["620px", "220px"],
						content: $(".link-web").html(),
						closeBtn: 1
					});
					$(".link-music").val(link);
					$(".link-music").select()
				})
			}
		})
	});
	
	//if (top.location.href.indexOf('http://fm.ercy.vip/') !== 0) top.location.href = 'http://fm.ercy.vip/'
	
	document.onkeydown = function(event) {
		if (event.keyCode == 13) {
			$("#btnSearch").click();
			return false
		}
	};
	$(".player-min").click(function() {
		if ($(".min-music").hasClass("play-left")) {
			OpenPlayer()
		} else {
			ClosePlayer()
		}
	});
	setTimeout(function() {
		$(".min-music").removeClass("animated");
		$(".min-music").removeClass("flipInY");
		setTimeout(function() {
			ClosePlayer()
		}, 1e3)
	}, 1e3);

	function OpenPlayer() {
		$(".player-min").css("background-image", "url(./Images/toLeft.png)");
		$(".min-music").removeClass("play-left");
		$(".min-music").addClass("play-right")
	}

	function ClosePlayer() {
		$(".player-min").css("background-image", "url(./Images/toRight.png)");
		$(".min-music").removeClass("play-right");
		$(".min-music").addClass("play-left")
	}
	var t;
	if (localStorage["PlayerList"] == "" || localStorage["PlayerList"] == null || localStorage["PlayerList"] == undefined) {
		t = {
			playlist: [{
				file: "http://p2.music.126.net/NnHwR2HV-1OoKZ6R5LVy4Q==/18502581673300023.mp3",
				thumb: "http://p4.music.126.net/m3_elKryq_x62UNHJ2NgHg==/109951162807555886.jpg",
				trackName: "告白气球",
				trackArtist: "周二珂",
				trackAlbum: "告白气球"
			}, {
				file: "http://m2.music.126.net/2mhugMaL0rTYrvVm-mlybA==/18514676300848306.mp3",
				thumb: "http://p3.music.126.net/fDn4RXX35jVS4diJ1frydA==/18358545649489902.jpg",
				trackName: "小幸运",
				trackArtist: "双笙",
				trackAlbum: "小幸运（翻唱）"
			}],
			autoPlay: true
		};
		$("#btn-pause").click()
	} else {
		t = JSON.parse(localStorage["PlayerList"]);
		$("#btn-pause").click()
	}

	function DelMusic() {
		var u = $(this).attr("url");
		for (var i = 0; i < t.playlist.length; i++) {
			if (t.playlist[i].file == u) {
				t.splice(t.playlist[i], 1);
				return
			}
		}
	}
	$(".jAudio--player").jAudio(t);
	$(".jAudio--playlist-item").hover(function() {
		$(this).find(".del").removeClass("fadeOutUp");
		$(this).find(".del").addClass("fadeInDown")
	}, function() {
		$(this).find(".del").removeClass("fadeInDown");
		$(this).find(".del").addClass("fadeOutUp")
	});
	$(".del").unbind("click");
	$(".del").click(function() {
		$(this).parent().parent().remove();
		var u = $(this).attr("delurl");
		for (var i = 0; i < t.playlist.length; i++) {
			if (t.playlist[i].file == u) {
				t.playlist.splice(i, 1);
				localStorage["PlayerList"] = JSON.stringify(t);
				return
			}
		}
	});
	$(".donation").click(function() {
		layer.open({
	type: 2,
 	 title:"捐助本站",
 	 fix: false, //不固定
 	 maxmin: false,
  	skin: 'layui-layer-rim', //加上边框
  	area: ['720px', '490px'], //宽高
  	content: "reward.html"
		})
	});
	$.goup({
		trigger: 100,
		bottomOffset: 20,
		locationOffset: 0,
		titleAsText: true
	})
});