import React from 'react';
import ReactEcharts from 'echarts-for-react';
import $ from 'jquery';

class EchartsComponent extends React.Component {
    constructor(props, context) {
    super(props, context);

     this.state = {
         loading: true,
         error: null,
         data: null
    }
    }
    loadData() {
        $.getJSON('../../data/hour/2016-08-27.json')
        .done(function(data) {
            this.setState({
                loading: false,
                data: data
            })
        }.bind(this))
        .fail(function(error) {
            this.setState({
                loading: false,
                error: error
            });
        }.bind(this));
    }
    componentDidMount(){

     setInterval(this.loadData(),1000);
    }

    getOtion() {
        var data = this.state.data;
        var timedata = new Array();
        var hmtdata = new Array();
        var tmpdata = new Array();
        $.each(data, function(i, item){
        timedata.push(item['time']);
        hmtdata.push(item['hmt']);
        tmpdata.push(item['tmp']);
        })
        const option = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['温度','湿度']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
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
            series : [
                {
                    name:'温度',
                    type:'line',
                    data: tmpdata,
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
                    data: hmtdata,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div className='examples'>
                <div className='parent'>
                    <ReactEcharts
                        option={this.getOtion()}
                        style={{height: '500px', width: '100%'}}
                        className='react_for_echarts' />
                </div>
            </div>
        );
    }

}

export default EchartsComponent;
