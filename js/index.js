
//获取url参数
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
var projectCode = $.getUrlParam('project');
var url

//京沈--'1308F0001&'   京张--'1101F001'
var buildcode,devcodeWeiyi,devcodeShidu
if(projectCode == 1){
    $('.header span').text('京张铁路边坡安全监测')
    //url = 'http://36.110.66.214:50001'
    url = 'http://192.168.20.16:8380'
    buildcode = '1101F001'
    devcodeWeiyi = '1101F00100010O08'
    devcodeShidu = '1101F00100010K03'
	$('.chart_2 div>:nth-child(2)').addClass('height_zhang')
}else if(projectCode == 2){
    $('.header span').text('京沈铁路边坡安全监测')
    url = 'http://36.110.66.218:8091'
    buildcode = '1308F0001'
    devcodeWeiyi = '1308F00010010O09'
    devcodeShidu = '1308F00010010K01'
    $('.chart_2 div>:nth-child(2)').addClass('height_shen')
}else if(projectCode == 3){
    $('.header span').text('冬奥会边坡安全监测')

}

//返回上一页
$('.jiantou').on('click',function () {
    location.href="loginBefore.html";
})
//判断登录
if($.cookie('password') == null){
    popupAlert('请登录...')
    location.href="loginBefore.html";
}

//时间戳获取时间
function getDate(datetime, year, month, date, hour, minute, second) {
	datetime = datetime.replace(/-/g, '/');
	var now = new Date(datetime);
	var year = now.getFullYear() + year;
	var month = now.getMonth() + month;
	var date = now.getDate() + date;

	var hour = now.getHours() + hour;
	var minute = now.getMinutes() + minute;
	var second = now.getSeconds() + second;

	var date = new Date(year, month, date, hour, minute, second);
	return getNowFormatDate(date);
}

function getNowFormatDate(datetime) {
	var date;
	if (datetime == 0) {
		date = new Date();
	} else {
		date = new Date(datetime);
	}

	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var Hours = date.getHours()
	var Minutes = date.getMinutes()
	var Seconds = date.getSeconds()

	if (Hours >= 0 && Hours <= 9) {
		Hours = "0" + Hours;
	}
	if (Minutes >= 0 && Minutes <= 9) {
		Minutes = "0" + Minutes;
	}
	if (Seconds >= 0 && Seconds <= 9) {
		Seconds = "0" + Seconds;
	}

	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		+ " " + Hours + seperator2 + Minutes
		+ seperator2 + Seconds;
	return currentdate;
}

// 起始时间
var startTime = getDate(getNowFormatDate(0), 0, 0, -1, 0, 0, 0);
// 结束时间（当前时间）
var endtime = getNowFormatDate(0);

//图表的标注
var chart_text = {};
chart_text.textStyle_color = "#334051";
chart_text.textStyle_fontWeight = "normal";
chart_text.textStyle_fontSize = "12";

//阈值2个
var T_para_a, L_para_a

// 基于准备好的dom，初始化位移echarts实例
var shiftChart = echarts.init(document.getElementById('main_1'));
//显示标题，图例和空的坐标轴
shiftChart.setOption({
	title: {
		// text: '位移',
		textStyle: {
			color: chart_text.textStyle_color,
			fontWeight: chart_text.textStyle_fontWeight,
			fontSize: chart_text.textStyle_fontSize
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			// type: 'cross',
			label: {
				backgroundColor: 'green'
			}
		}
	},
	toolbox: {
		feature: {
			saveAsImage: {
				type: "png",
				// name:"位移数据_"+getNowFormatDate(0),
				title: "下载"
			},
			restore: {},
		}
	},
	legend: {
		data: ['位移'],
		bottom: '5px'
	},
	grid: {
		top: '20%',
		left: '12%',
		right: '8%',
		bottom: '13%',
		bontainLabel: true
	},
	xAxis: {
		type: 'category',
		data: [],
        /*axisLabel: {
            interval:0,
            rotate:40
        }*/
    },
	yAxis: {
		type: 'value',
		name: '位移(mm)',
		nameTextStyle: {
			color: '#666666',
			fontWeight: 'bolder',
			fontSize: 12
		},
		max: 100,
		axisLabel: {
			color: '#333333',
			fontSize: 14
		}
	},
	series: [
		{
			/*name: '位移',*/
			type: 'line',
			yAxisIndex: 0,
			symbol: 'circle',
			symbolSize: 9,
			//拐点标志样式
			itemStyle: {
				normal: {
					color: '#FF5100',
					lineStyle: {color: '#FF5100', width: '3'},
					areaStyle: {type: 'default'}
				}
			},
			//渐变橙白
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(255,213,193,0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(255,255,255,0.2)'
					}])
				}
			},

		}]
});

var waterChart = echarts.init(document.getElementById('main_2'));
waterChart.setOption({
	title: {
		// text: '土壤含水率',
		textStyle: {
			color: chart_text.textStyle_color,
			fontWeight: chart_text.textStyle_fontWeight,
			fontSize: chart_text.textStyle_fontSize
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			// type: 'cross',
			label: {
				backgroundColor: 'green'
			}
		}
	},
	toolbox: {
		feature: {
			saveAsImage: {
				type: "png",
				title: "下载"
			},
			restore: {},
		}
	},
	legend: {
		data: ['含水率'],
		bottom: '5px'
	},
	grid: {
		top: '20%',
		left: '12%',
		right: '8%',
		bottom: '13%',
		bontainLabel: true
	},
	xAxis: {
		data: []
	},
	yAxis: {
		name: '含水率(%)',
		nameTextStyle: {
			color: '#666666',
			fontWeight: 'bolder',
			fontSize: 12
		},
		axisLabel: {
			color: '#333333',
			fontSize: 14
		}
	},
	series: [
		{
			name: '含水率',
			type: 'line',
			yAxisIndex: 0,
			//symbol: 'circle',
			symbolSize: 4,
			//拐点标志样式
			itemStyle: {
				normal: {
					color: '#FF5100',
					lineStyle: {color: '#FF5100', width: '2'},
					//areaStyle: {type: 'default'}
				}
			},
			//渐变橙白
			/*areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(255,213,193,0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(255,255,255,0.2)'
					}])
				}
			},*/

		}]
});

//登录
/*$.ajax({
 type: "post",
 async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
 url: "http://36.110.66.218:8091/zzcismp/user/login.shtml?username=admin&password=123456",    //请求发送到TestServlet处
 data: {},
 dataType: "json",        //返回数据形式为json
 success: function (result) {
 //请求成功时执行该函数内容，result即为服务器返回的json对象
 if (result) {
 console.log(result);

 }
 },
 error: function (errorMsg) {
 //请求失败时执行该函数
 alert("请求数据失败!");
 }
 });*/

$.ajax({
	type: "post",
	async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
	//url: url + "/zzcismp/tsd/getBuildDevsData.shtml?starttime=" + startTime + "&endtime=" + endtime + "&timetype=hour",    //请求发送到TestServlet处
    url: url + "/zzcismp/tsd/getBuildDevsData.shtml",
    data: {
	    'timetype':'hour',
	    'starttime':startTime,
        'endtime':endtime,
        'buildcode':buildcode
    },
	dataType: "json",        //返回数据形式为json
	success: function (result) {
		//请求成功时执行该函数内容，result即为服务器返回的json对象
		var devName = [];  //T1 T2 L1...

		var shiftChartData = [];
		var waterChartData = [];
		var chartTime = [];
		if (result) {
			console.log(result);

			for (var i = 0; i < result.length; i++) {
				var deviceData = result[i].data;
				var shiftChartDeviceData = [];
				var waterChartDeviceData = [];
				for (var m = 0; m < deviceData.length; m++) {
					var pointData = deviceData[m].data;

					var time = deviceData[m].time

					if (i == 0) {
						chartTime.push(time);
					}
					if (result[i].type == 'K') {
						waterChartDeviceData.push(pointData.rh);
					}
					if (result[i].type == 'O') {
						shiftChartDeviceData.push(pointData.l);
					}

				}
                devName.push({name:result[i].devname,dev:result[i].devcode})
				shiftChartData.push({
					name: result[i].devname,
					type: 'line',
					data: shiftChartDeviceData
				});
				waterChartData.push({
					name: result[i].devname,
					type: 'line',
					data: waterChartDeviceData
				});
			}
			shiftChart.setOption({
				xAxis: {
					data: chartTime
				},
				series: shiftChartData
			});

			waterChart.setOption({
				xAxis: {
					data: chartTime
				},
				series: waterChartData
			});
			/*选择设备的ul*/
			$('#select1').empty()
            $('#dropdownMenu1').attr('value',devName[0].dev)
			for(var q=0;q<devName.length;q++){
                $('#select1').append(`<li><a class=${devName[q].dev} href="javascript:;">${devName[q].name}</a></li>`)
			}
		}
	},
	error: function (errorMsg) {
		//请求失败时执行该函数
        popupAlert('网络错误...')
	}
});

//位移设备阈值
$.ajax({
	type: "post",
	async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
	url: url + "/zzcismp/alarm/getAlarmValueByDevcode.shtml",    //请求发送到TestServlet处
	data: {devcode:devcodeWeiyi},
	dataType: "json",        //返回数据形式为json
	success: function (result) {
		//请求成功时执行该函数内容，result即为服务器返回的json对象
		console.log(result)
		if (result) {
			L_para_a = result.para_b
			shiftChart.setOption({
				series:{
					markLine:{
						lineStyle : {
							color:'#ba0000',
						},
						data : [
							{
								yAxis: L_para_a,
							}
						]
					}
				}
			})
		}
	},
	error: function (errorMsg) {
		//请求失败时执行该函数
        popupAlert('请登录...')
	}
});
//含水率设备阈值
$.ajax({
	type: "post",
	async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
	url: url + "/zzcismp/alarm/getAlarmValueByDevcode.shtml",    //请求发送到TestServlet处
	data: {devcode:devcodeShidu},
	dataType: "json",        //返回数据形式为json
	success: function (result) {
		//console.log(result)
		T_para_a = result.para_b
		if (result) {
			waterChart.setOption({
				series:{
					markLine:{
						lineStyle : {
							color:'#ba0000',
						},
						data : [
							{
								yAxis: T_para_a,
							}
						]
					}
				}
			})
		}
	},
	error: function (errorMsg) {
		//请求失败时执行该函数
        popupAlert('请登录...')
	}
});
//最下边表格
/*laydate.render({
	elem: '#end_time'
});*/



function getDevcode(n) {
	var val
	switch(n)
	{
		case 'T1':
			val = "1308F00010010K01"
			break;
		case 'T2':
			val = "1308F00010010K02"
			break;
		case 'T3':
			val = "1308F00010010K03"
			break;
		case 'T4':
			val =  "1308F00010010K04"
			break;
		case 'T5':
			val =  "1308F00010010K05"
			break;
		case 'T6':
			val =  "1308F00010010K06"
			break;
		case 'T7':
			val =  "1308F00010010K07"
			break;
		case 'T8':
			val =  "1308F00010010K08"
			break;
		case 'T9':
			val =  "1308F00010010K09"
			break;
		case 'L1':
			val =  "1308F00010010O09"
			break;
		case 'L2':
			val =  "1308F00010010O10"
			break;
		case 'L3':
			val =  "1308F00010010O11"
			break;
		case 'L4':
			val =  "1308F00010010O12"
			break;
		default:

	}
	return val
}
//弹窗提示
function popupAlert(x) {
    $('.tip').text(x)
    $('.zhe').show()
    setTimeout(function () {
        $('.zhe').hide()
    },2000)
}

$('.button_01').on('click',function () {
	if(!$('#end_time').val()){
        popupAlert('请选择日期...')
		return
	}

	//var type_text = $('#dropdownMenu1').text().trim()  //取到显示的值L1等
    var devcode = $('#dropdownMenu1').attr('value')
	//var devcode = getDevcode(type_text)
	var start_time = $('#end_time').val() + ' 00:00:00'
	var end_time = $('#end_time').val() + ' 23:59:59'

	/*if(devcode.substr(13,1) == 'K'){

	}else {

	}*/

	$.ajax({
		type: "post",
		async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
		//url: "http://36.110.66.218:8091/zzcismp/tsd/getDevData.shtml?devcode=1308F00010010O10&starttime=2018-09-01%2000:00:00&endtime=2018-10-01%2000:00:00&timetype=hour",
		url: url + '/zzcismp/tsd/getDevData.shtml',
		data: {
			//devcode:'1308F00010010O10',
			devcode:devcode,
			starttime:start_time,
			endtime: end_time,
			timetype:'hour'
		},
		dataType: "json",
		success: function (result) {
			$('.weilan_table tbody').html('')
			console.log(result)
			if (result) {
				for(var i=0;i<result.data.length;i++){
					$('.weilan_table tbody').append(`<tr>
                    <td>${i+1}</td>
                    <td class="goal_n2">${devcode.substr(13,1) == 'K'?result.data[i].data.rh:result.data[i].data.l}</td>
                    <td class="start_n2">${result.data[i].time}</td>
                    </tr>`)
				}

				var h_height = $('.weilan_table').height() + 100 + 'px'
				$('#history').css('height', h_height)
			}else {
                popupAlert('该时间没有数据...')
			}

		},
		error: function (errorMsg) {
			//请求失败时执行该函数
            popupAlert('网络错误...')
		}
	});

})