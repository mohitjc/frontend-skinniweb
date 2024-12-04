import React, { useEffect, useRef, useState } from "react";
import ReactEcharts from "echarts-for-react";

const GanttChart = ({ totalAmounts, dates, names, type }) => {
  const myChartRef = useRef(null); 
  const [chartOptions, setChartOptions] = useState(null); 

  const HEIGHT_RATIO = 0.6;
  const DIM_CATEGORY_INDEX = 0;
  const DIM_TIME_ARRIVAL = 1;
  const DIM_TIME_DEPARTURE = 2;

  useEffect(() => {
    const rawData = {
      flight: {
        dimensions: ["flight", "arrival", "departure", "flightNumber"],
        data: [
          [0, "2024-11-01T10:00:00", "2024-11-01T12:00:00", "Flight 101"],
          [1, "2024-11-01T13:00:00", "2024-11-01T15:00:00", "Flight 102"],
        ],
      },
      parkingApron: {
        dimensions: ["index", "name", "position"],
        data: [
          [0, "Gate A", "Position 1"],
          [1, "Gate B", "Position 2"],
        ],
      },
    };

    const option = makeOption(rawData);
    setChartOptions(option); 
  }, []);

  function makeOption(rawData) {
    return {
      tooltip: {},
      animation: false,
      toolbox: {
        left: 20,
        top: 0,
        itemSize: 20,
        feature: {
          myDrag: {
            show: true,
            title: 'Make bars draggable',
            icon: 'path://M990.55 380.08 q11.69 0 19.88 8.19...',
            onclick: onDragSwitchClick
          }
        }
      },
      title: {
        text: 'Gantt Chart',
        left: 'center',
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          height: 20,
          start: 0,
          end: 26,
        },
      ],
      grid: {
        show: true,
        top: 70,
        bottom: 20,
        left: 100,
        right: 20,
      },
      xAxis: {
        type: 'time',
        position: 'top',
        axisLine: { show: false },
        axisLabel: { color: '#929ABA' },
      },
      yAxis: {
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false },
        min: 0,
        max: rawData.parkingApron.data.length,
      },
      series: [
        {
          id: 'flightData',
          type: 'custom',
          renderItem: renderGanttItem,
          dimensions: rawData.flight.dimensions,
          encode: {
            x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
            y: DIM_CATEGORY_INDEX,
            tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
          },
          data: rawData.flight.data,
        },
        {
          type: 'custom',
          renderItem: renderAxisLabelItem,
          dimensions: rawData.parkingApron.dimensions,
          encode: { x: -1, y: 0 },
          data: rawData.parkingApron.data.map((item, index) => [index].concat(item)),
        }
      ]
    };
  }

  function renderGanttItem(params, api) {
    const categoryIndex = api.value(DIM_CATEGORY_INDEX);
    const timeArrival = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex]);
    const timeDeparture = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex]);
    const barLength = timeDeparture[0] - timeArrival[0];
    const barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;

    return {
      type: 'group',
      children: [
        {
          type: 'rect',
          shape: {
            x: timeArrival[0],
            y: timeArrival[1] - barHeight,
            width: barLength,
            height: barHeight,
          },
          style: api.style(),
        },
      ],
    };
  }

  function renderAxisLabelItem(params, api) {
    const y = api.coord([0, api.value(0)])[1];
    return {
      type: 'group',
      position: [10, y],
      children: [
        {
          type: 'path',
          shape: {
            d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
            x: 0,
            y: -20,
          },
          style: { fill: '#368c6c' },
        },
        {
          type: 'text',
          style: {
            x: 24,
            y: -3,
            text: api.value(1),
            textVerticalAlign: 'bottom',
            textAlign: 'center',
            textFill: '#fff',
          },
        },
      ],
    };
  }

  function onDragSwitchClick(model, api, type) {
  }

  return (
    <div>
      {chartOptions ? (
        <ReactEcharts ref={myChartRef} option={chartOptions} style={{ height: "400px" }} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
};

export default GanttChart;
