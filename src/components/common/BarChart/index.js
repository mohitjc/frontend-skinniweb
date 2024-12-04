import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import colorsModel from '../../../models/colors.model';
import pipeModel from '../../../models/pipeModel';

const BarChart = ({ data = [], legends = [], hideLegends = true, showReply =false,refundData=false,showSaleFormat=false,stack=false}) => {
    const colors=colorsModel.list
    const [overtimeLoader, setOvertimeLoader] = useState(false)
    const [hiddenItem, setHiddenItem] = useState([])
    useEffect(()=>{
        if(data?.length){
            setOvertimeLoader(true)
            setTimeout(()=>{
                setOvertimeLoader(false)
            },500)
        }
    },[data,legends])


    const ToolTipReturner = (tooltipData) => {
        const DataReturner = (data) => {
            return pipeModel.number(data.value)
        }

        let initialTooltip = `${tooltipData?.[0]?.name}<br/>`;
        tooltipData.forEach((item) => {
            initialTooltip += `<b>${item?.seriesName} </b> : <b> ${DataReturner(item)}</b> <br/>`
        })
        if(stack){
            initialTooltip += `<b>Total </b> : <b> ${tooltipData.map(itm=>Number(itm.value||0)).reduce((total,num)=>(total+num))}</b> <br/>`
        }
        return initialTooltip
    }
    const legendClick = (itm) => {
        let arr = hiddenItem
        if (!showReply) {
            if (arr.find(fitm => fitm.key == itm.key)) {
                arr = arr.filter(fitm => fitm.key != itm.key)
            } else {
                arr.push(itm)
            }
        } else {
            if (itm?.key != 'All') {
                arr = arr.filter((item) => item?.key != itm?.key)
                legends.map((item) => {
                    if (item?.key != itm?.key) {
                        arr.push(item)
                    }
                })
            } else {
                arr = []
            }
        }
        setHiddenItem([...arr])
        setOvertimeLoader(true)
        setTimeout(() => {
            setOvertimeLoader(false)
        }, 100);
    }

    const performanceLegends = [...legends.filter(itm=>!itm?.hide).map(itm=>itm.label)]
    const performanceOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function (dat) {
                return ToolTipReturner(dat)
            }
        },
        legend:hideLegends?null:{
          data: [...performanceLegends]
          
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
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [
                    ...data.map(itm => itm.date)
                ]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            ...legends.map((itm,i)=>{
                return {
                    name: itm.label,
                    key:itm.key,
                    type: 'bar',
                    stack:stack?'bar':null,
                    itemStyle: {normal: {areaStyle: {type: 'default'},color: colors?.[i]}},
                    data: [
                        ...data.map(ditm => !showReply ? ditm[itm.key] || 0 : ditm[itm.key]['count'] || 0),
                    ]
                }
            }).filter(fitm=>{
                let ext=hiddenItem.find(eitm=>eitm.key==fitm.key||eitm.compare==fitm.key)
                let value=true
                if(ext){
                    value=false
                    if(ext?.compare==fitm.key){
                        value=false
                    }
                }
        
                return value
            })
        ]
    };

   const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [...performanceLegends]
        },
        xAxis: [
          {
            type: 'category',
            data: [...data.map(itm => itm.date)]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
            ...legends.map(itm=>{
                return {
                    name: itm.label,
                    type: 'bar',
                    data: [
                        ...data.map(ditm => Number(ditm[itm.key]||0)),
                    ],
                  }
            }).filter(fitm=>{
                let ext=hiddenItem.find(eitm=>eitm.key==fitm.key||eitm.compare==fitm.key)
                let value=true
                if(ext){
                    value=false
                    if(ext?.compare==fitm.key){
                        value=false
                    }
                }
        
                return value
            })
        ]
      };

    return <>
        {overtimeLoader ? <>
            <div className='shine shineCard'></div>
        </> : <>
        <div>
        <div className='legends flex gap-2'>
                {legends.map((itm,i)=>{
                    if(!itm.hide)
                    return <>
                <div className={`legendItem flex ${hiddenItem.find(fitm=>fitm.key==itm.key)?'active':''}`} onClick={()=>legendClick(itm)}>
                    <div className='color' style={{background:colorsModel.list[i]}}></div>
                    {itm.label}</div>
                    </>
                })}
            </div>
            <ReactECharts
                option={performanceOption}
                opts={{renderer:'svg'}}
                style={{ height: 400 }}
            />
        </div>
            
        </>}
    </>
}

export default BarChart