$(function () {
function showLocale(objD)
{
    var str,colorhead,colorfoot;
    var yy = objD.getYear();
    if(yy<1900) yy = yy+1900;
    var MM = objD.getMonth()+1;
    if(MM<10) MM = '0' + MM;
    var dd = objD.getDate();
    if(dd<10) dd = '0' + dd;
    str = yy + "-" + MM + "-" + dd;
    return(str);
}
function removewucha(){

}
function createchart(pathfile,dataindex){
        $.getJSON(pathfile, function (rawData) {
        var timedata = [];
        var tmpdata = [];
        var hmtdata = [];
        $.each(rawData, function(i, item){
        if(i%dataindex==0){
        timedata.push(item['time']);
        tmpdata.push(item['tmp']);
        hmtdata.push(item['hmt']);
        }
        })
        var myChart = echarts.init(document.getElementById('main'));

    option = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['温度','湿度']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: timedata
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name:'温度',
            type:'line',
            data:tmpdata,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
        },
        {
            name:'湿度',
            type:'line',
            data:hmtdata,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
        }
    ]
};
        myChart.setOption(option);
        });
}
        var todaytime = new Date();
        var settime = 'hour';
        var pathfile = 'data/'+ settime + '/' + showLocale(todaytime) + '.json';
        createchart(pathfile,1);
             $('#singleDateRange').DatePicker({
                startDate: moment()
            });
            $('#submitit').click(function(){
                 var selectdate = $('#singleDateRange').val();
                 settime = 'min';
                 var pathfile = 'data/' + settime + '/' + selectdate + '.json';
                createchart(pathfile,1);
            });
            $('#changeit').click(function(){
                 var selectdate = $('#singleDateRange').val();
                 settime = 'hour';
                 var pathfile = 'data/' + settime + '/' + selectdate + '.json';
                createchart(pathfile,1);
            });
       });
