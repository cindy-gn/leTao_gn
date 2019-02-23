


$(function () {
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数','销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [520, 220, 306, 410, 310, 270]
        },{
            name: '销量',
            type: 'bar',
            data: [501, 230, 346, 410, 210, 200]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);
    var echarts_right=echarts.init(document.querySelector('.echarts_right'));
    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2019年2月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['阿迪', '耐克', '老北京', '老奶奶', '新百伦']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '阿迪' },
                    { value: 310, name: '耐克' },
                    { value: 234, name: '老北京' },
                    { value: 135, name: '老奶奶' },
                    { value: 1548, name: '新百伦' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 20,
                        shadowOffsetX: 10,
                        shadowColor: 'yellow'
                    }
                }
            }
        ]
    };


    echarts_right.setOption(option2);

})