window.onload = function() {
	// 柱状图延迟动画
	myEcharts.drawBarLazyAnimChart();
	// 柱状框选
	myEcharts.drawBarBoxToChooseChart();
	// 特性展示
	myEcharts.drawBarFeatureChart();
	// 正负柱状图
	myEcharts.drawBarPosiNageChart();
	// 交错正负轴标签
	myEcharts.drawBarStaggerChart();
	// 堆叠柱状图
	myEcharts.drawBarStackBarChart();
	// 深圳月最低生活费组成
	myEcharts.drawBarLiveWageChart();
	// 阶梯瀑布图
	myEcharts.drawBarWaterFallChart();
	// 堆叠条形图、
	myEcharts.drawBarStackChart();
	// 世界人口总量
	myEcharts.drawBarWorldPopulationChart();
	// 蒸发量和降雨量
	myEcharts.drawBarEvaporationChart();
	// 动态数据
	myEcharts.drawBarDynamicDataChart();
};

var myEcharts = {
	drawBarLazyAnimChart: function() {
		var myChart = echarts.init(document.getElementById('barLazyAnim'));

		var xAxisData = [];
		var data1 = [];
		var data2 = [];

		for (var i = 0; i < 100; i++) {
			xAxisData.push('类目' + i);
			data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    		data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
		}

		var option = {
			title: {
				text: '柱状图动画延迟'
			},
			legend: {
				data: ['bar', 'bar2'],
				align: 'left'
			},
			toolbox: {
				feature: {
					magicType: {
						type: ['stack', 'tiled']
					},
					dataView: {},
					saveAsImage: {
						pixelRatio: 2
					}
				}
			},
			tooltip: {},
			xAxis: {
				data: xAxisData,
				silent: false,
				splitLine: {
					show: false
				}
			},
			yAxis: {
			},
			series: [
				{
					name: 'bar',
					type: 'bar',
					data: data1,
					animationDelay: function(idx) {
						return idx * 10;
					}
				},
				{
					name: 'bar2',
					type: 'bar',
					data: data2,
					animationDelay: function(idx) {
						return idx * 10 + 100;
					}
				}
			],
			animationEasing: 'elasticOut',
			animationDelayUpdate: function(idx) {
				return idx * 5;
			}
		};

		myChart.setOption(option);
	},
	drawBarBoxToChooseChart: function() {
		var myChart = echarts.init(document.getElementById('boxChoose'));

		var xAxisData = [];
		var data1 = [], data2 = [], data3 = [], data4 = [];

		for (var i = 0; i < 10; i++) {
			xAxisData.push('Class' + i);
			data1.push((Math.random() * 2).toFixed(2));
			data2.push(-Math.random().toFixed(2));
			data3.push((Math.random() * 5).toFixed(2));
			data4.push((Math.random() * 0.3).toFixed(2));
		}

		var itemStyle = {
			normal: {},
			emphasis: {
				barBorderWidth: 1,
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowColor: 'rgba(0,0,0,0.5)'
			}
		};
		var option = {
			backgroundColor: '#eee',
			legend: {
				data: ['bar', 'bar2', 'bar3', 'bar4'],
				align: 'left',
				left: 10
			},
			brush: {
				toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
				xAxisIndex: 0
			},
			toolbox: {
				feature: {
					magicType: {
						type: ['stack', 'tiled']
					},
					dataView: {}
				}
			},
			tooltip: {},
			xAxis: {
				data: xAxisData,
				name: 'X Axis',
				silent: false,
				axisLine: {onZero: true},
				splitLine: {show: false},
				splieArea: {show: false}
			},
			yAxis: {
				inverse: true,
				splitArea: {show: false}
			},
			grid: {
				left: 100
			},
			visualMap: {
				type: 'continuous',
				dimension: 1,
				text: ['High', 'low'],
				inverse: true,
				itemHeight: 200,
				calculable: true,
				min: -2,
				max: 6,
				top: 60,
				left: 10,
				inRange: {
					colorLightness: [0.4, 0.8]
				},
				outOfRange: {
					color: '#bbb'
				},
				controller: {
					inRange: {
						color: '#2f4554'
					}
				}
			},
			series: [
				{
					name: 'bar',
					type: 'bar',
					stack: 'one',
					itemStyle: itemStyle,
					data: data1
				},
				{
		            name: 'bar2',
		            type: 'bar',
		            stack: 'one',
		            itemStyle: itemStyle,
		            data: data2
		        },
		        {
		            name: 'bar3',
		            type: 'bar',
		            stack: 'two',
		            itemStyle: itemStyle,
		            data: data3
		        },
		        {
		            name: 'bar4',
		            type: 'bar',
		            stack: 'two',
		            itemStyle: itemStyle,
		            data: data4
		        }
			]
		};

		myChart.setOption(option);

		myChart.on('brushSelected', renderBrushed);

		function renderBrushed(params) {
			var brushed = [];
			var brushComponent = params.batch[0];

			for (var sIdx = 0; i < brushComponent.selected.length; sIdx++) {
				var rawIndices = brushComponent.selected[sIdx].dataIndex;
				brushed.push('[Series ' + sIdx + ']' + rawIndices.join(', '));
			}

			myChart.setOption({
				title: {
					backgroundColor: '#333',
					text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
					bottom: 0,
					right: 0,
					width: 100,
					textStyle: {
						fontSize: 12,
						color: '#fff'
					}
				}
			});
		}
	},
	drawBarFeatureChart: function() {
		var myChart = echarts.init(document.getElementById('feature'));
		var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
		var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
		var yMax = 500;
		var dataShadow = [];

		for (var i = 0; i < data.length; i++) {
			dataShadow.push(yMax);
		}

		var option = {
			title: {
				text: '特性示例：渐变色 阴影 点击缩放',
				subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
			},
			xAxis: {
				data: dataAxis,
				axisLabel: {
					inside: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				z: 10
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				}
			},
			dataZoom: [
				{
					type: 'inside'
				}
			],
			series: [
				{
					type: 'bar',
					itemStyle: {
						normal: {color: 'rgba(0,0,0,0.05)'}
					},
					barGap: '-100%',
					barCategoryGap: '40%',
					data: dataShadow,
					animation: false
				},
				{
					type: 'bar',
					itemStyle: {
						normal: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#83bff6'},
		                            {offset: 0.5, color: '#188df0'},
		                            {offset: 1, color: '#188df0'}
		                        ]
		                    )
		                },
		                emphasis: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#2378f7'},
		                            {offset: 0.7, color: '#2378f7'},
		                            {offset: 1, color: '#83bff6'}
		                        ]
		                    )
		                }
					},
					data: data
				}
			]
		};

		myChart.setOption(option);
	},
	drawBarPosiNageChart: function() {
		var myChart = echarts.init(document.getElementById('posi-nage'));
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['利润', '支出', '收入']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'value'
				}
			],
			yAxis: [
				{
					type: 'category',
					axisTick: {show: false},
					data: ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			series: [
				{
					name: '利润',
					type: 'bar',
					label: {
						normal: {
							show: true,
							position: 'inside'
						}
					},
					data: [200, 170, 240, 244, 220, 210]
				},
				{
					name: '收入',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true
						}
					},
					data: [320, 302, 341, 374, 390, 450, 420]
				},
				{
					name: '支出',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'left'
						}
					},
					data: [-120, -132, -101, -134, -190, -230, -210]
				}
			]
		};
		myChart.setOption(option);
	},
	drawBarStaggerChart: function() {
		var myChart = echarts.init(document.getElementById('stagger'));

		var labelRight = {
			normal: {
				position: 'right'
			}
		};

		var option = {
			title: {
				text: '交错正负轴标签',
				subtext: 'From ExcelHome',
				sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				top: 80,
				bottom: 30
			},
			xAxis: {
				type: 'value',
				position: 'top',
				splitLine: {lineStyle: {type: 'dashed'}}
			},
			yAxis: {
				type: 'category',
				axisLine: {show: false},
				axisLabel: {show: false},
				axisTick: {show: false},
				splitLine: {show: false},
				data: ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
			},
			series: [
				{
					name: '生活费',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							formatter: '{b}'
						}
					},
					data: [
						{value: -0.07, label: labelRight},
						{value: -0.09, label: labelRight},
						0.2, 0.44,
						{value: -0.23, label: labelRight},
						0.08,
						{value: -0.17, label: labelRight},
						0.47,
						{value: -0.36, label: labelRight},
						0.18
					]
				}
			]
		};

		myChart.setOption(option);
	},
	drawBarStackBarChart: function() {
		var myChart = echarts.init(document.getElementById('stackBar'));

		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '直接访问',
					type: 'bar',
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				{
					name: '邮件营销',
					type: 'bar',
					stack: '广告',
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '联盟广告',
					type: 'bar',
					stack: '广告',
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '视频广告',
					type: 'bar',
					stack: '广告',
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '搜索引擎',
					type: 'bar',
					data: [862, 1018, 964, 1026, 1679, 1600, 1570],
					markLine: {
						lineStyle: {
							normal: {
								type: 'dashed'
							}
						},
						data: [
							[{type: 'min'}, {type: 'max'}]
						]
					}
				},
				{
					name: '百度',
					type: 'bar',
					barWidth: 5,
					satck: '搜索引擎',
					data: [620, 732, 701, 734, 1090, 1130, 1120]
				},
				{
					name: '谷歌',
					type: 'bar',
					stack: '搜索引擎',
					data: [120, 132, 101, 134, 290, 230, 220]
				},
				{
					name: '必应',
					type: 'bar',
					stack: '搜索引擎',
					data: [120, 132, 101, 134, 290, 230, 220]
				},
				{
					name: '其他',
					type: 'bar',
					stack: '搜索引擎',
					data: [62, 82, 91, 84, 109, 110, 120]
				}
			]
		};
		myChart.setOption(option);
	},
	drawBarLiveWageChart: function() {
		var myChart = echarts.init(document.getElementById('livingWage'));
		var option = {
			title: {
				text: '深圳月最低生活费组成（单位：元）',
				subtext: 'From ExcelHome',
				sublink: 'http://e.weibo.com/1341556070/AjQH99che'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				formatter: function(params) {
					var tar = params[1];
					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				splitLine: {show: false},
				data: ['总费用','房租','水电费','交通费','伙食费','日用品数']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '辅助',
					type: 'bar',
					stack: '总量',
					itemStyle: {
						normal: {
							barBorderColor: 'rgba(0,0,0,0)',
							color: 'rgba(0,0,0,0)'
						},
						emphasis: {
							barBorderColor: 'rgba(0,0,0,0)',
							color: 'rgba(0,0,0,0)'
						}
					},
					data: [0, 1700, 1400, 1200, 300, 0]
				},
				{
					name: '生活费',
					type: 'bar',
					stack: '总量',
					label: {
		                normal: {
		                    show: true,
		                    position: 'inside'
		                }
		            },
		            data:[2900, 1200, 300, 200, 900, 300]
				}
			]
		};
		myChart.setOption(option);
	},
	drawBarWaterFallChart: function() {
		var myChart = echarts.init(document.getElementById('waterFall'));

		var option = {
			title: {
				text: '阶梯瀑布图',
				subtext: 'From ExcelHome',
				sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				formatter: function(params) {
					var tar;
					if (params[1].value != '-') {
						tar = params[1];
					} else {
						tar = params[0];
					}
					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
				}
			},
			legend: {
				data: ['支出', '收入']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				splitLine: {show: false},
				data: function() {
					var list = [];
					for (var i = 0; i <= 11; i++) {
						list.push('11月' + i + '日');
					}
					return list;
				}()
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '辅助',
					type: 'bar',
					stack: '总量',
					itemStyle: {
						normal: {
							barBorderColor: 'rgba(0,0,0,0)',
							color: 'rgba(0,0,0,0)'
						},
						emphasis: {
							barBorderColor: 'rgba(0,0,0,0)',
							color: 'rgba(0,0,0,0)'
						}
					},
					data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
				},
				{
					name: '收入',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
				},
				{
					name: '支出',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'bottom'
						}
					},
					data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
				}
			]
		};

		myChart.setOption(option);
	},
	drawBarStackChart: function() {
		var myChart = echarts.init(document.getElementById('barStack'));

		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
			},
			xAxis:{
				type: 'value'
			},
			yAxis: {
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				data: ['周一','周二','周三','周四','周五','周六','周日']
			},
			series: [
				{
					name: '直接访问',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [320, 302, 301, 334, 390, 330, 320]
				},
				{
					name: '邮件营销',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '联盟广告',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '视频广告',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [150, 212, 201, 154, 190, 330, 410]
				},
				{
					name: '搜索引擎',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [820, 832, 901, 934, 1290, 1330, 1320]
				}
			]
		};
		
		myChart.setOption(option);
	},
	drawBarWorldPopulationChart: function() {
		var myChart = echarts.init(document.getElementById('worldPopulation'));

		var option = {
			title: {
				text: '世界人口总量',
				subtext: '数据来自网络'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['2011年', '2012年']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				type: 'category',
				data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
			},
			series: [
				{
					name: '2011年',
					type: 'bar',
					data: [18203, 23489, 29034, 104970, 131744, 630230]
				},
				{
					name: '2012年',
					type: 'bar',
					data: [19325, 23438, 31000, 121594, 134141, 681807]
				}
			]
		};

		myChart.setOption(option);
	},
	drawBarEvaporationChart: function() {
		var myChart = echarts.init(document.getElementById('evaporation'));
		
		var option = {
			title: {
				text: '某地区蒸发量和降水量',
				subtext: '纯属虚构'
			},
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			legend: {
				data: ['蒸发量', '降水量']
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {show: true, readOnly: false},
					magicType: {show: true, type: ['line', 'bar']},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			xAxis: [
				{
					type: 'category',
					data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '蒸发量',
					type: 'bar',
					data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
					markPoint: {
						data: [
							{type: 'max', name: '最大值'},
							{type: 'min', name: '最小值'}
						]
					},
					markLine: {
						data: [
							{type: 'average', name: '平均值'}
						]
					}
				},
				{
					name: '降水量',
					type: 'bar',
					data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
					markPoint: {
						data: [
							{name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
							{name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
						]
					},
					markLine: {
						data: [
							{type: 'average', name: '平均值'}
						]
					}
				}
			]
		};

		myChart.setOption(option);
	},
	drawBarDynamicDataChart: function() {
		var myChart = echarts.init(document.getElementById('dynamicData'));

		var option = {
			title: {
				text: '动态数据',
				subtext: '纯属虚构'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['最新成交价', '预购队列']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				show: true,
				feature: {
					dataVeiw: {readOnly: false},
					restore: {},
					saveAsImage: {}
				}
			},
			dataZoom: {
				show: false,
				start: 0,
				end: 100
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: true,
					data: (function() {
						var now = new Date();
						var res = [];
						var len = 10;
						while(len--) {
							res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
							now = new Date(now - 2000);
						}
						return res;
					})()
				},
				{
					type: 'category',
					boundaryGap: true,
					data: (function() {
						var res = [];
						var len = 10;
						while (len--) {
							res.push(len + 1);
						}
						return res;
					})()
				}
			],
			yAxis: [
				{
					type: 'value',
					scale: true,
					name: '价格',
					max: 30,
					min: 0,
					boundaryGap: [0.2, 0.2]
				},
				{
					type: 'value',
					scale: true,
					name: '预购量',
					max: 1200,
					min: 0,
					boundaryGap: [0.2, 0.2]
				}
			],
			series: [
				{
					name: '预购队列',
					type: 'bar',
					xAxisIndex: 1,
					yAxisIndex: 1,
					data: (function() {
						var res = [];
						var len = 10;
						while(len --) {
							res.push(Math.round(Math.random() * 1000));
						}
						return res;
					})()
				},
				{
					name: '最新成交价',
					type: 'line',
					data: (function() {
						var res = [];
						var len = 0;
						while(len < 10) {
							res.push((Math.random() * 10 + 5).toFixed(1) - 0);
							len ++;
						}
						return res;
					})()
				}
			]
		};
		var app = {
			count: 11
		};
		setInterval(function() {
			axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			data0.shift();
			data0.push((Math.random() * 10 + 5).toFixed(1) - 0);
			data1.shift();
			data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			option.xAxis[1].data.shift();
			option.xAxis[1].data.push(app.count++);
			
			myChart.setOption(option);
		}, 2100);
	}
};