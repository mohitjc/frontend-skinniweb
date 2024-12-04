import React from "react";
import { useSelector } from "react-redux";
import ReactEcharts from "echarts-for-react";
const HorizontalLineGraph = () => {
  const user = useSelector((state) => state.user);

  const countryBreakdownData = {
    UK: 40,
    India: 30,
    Australia: 50,
    Japan: 18,
    USA: 15,
  };

  const value = [
    { name: "Melbourne", value: countryBreakdownData?.USA || 0 },
    { name: "Chandigarh", value: countryBreakdownData?.Japan || 0 },
    { name: "Mohali", value: countryBreakdownData?.Australia || 0 },
    { name: "New york", value: countryBreakdownData?.India || 0 },
    { name: "Florida", value: countryBreakdownData?.UK || 0 },
  ];

  let updatedOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}%",
    },
    xAxis: {
      type: "value",
      axisLabel: {
        show: false, 
      },
      axisLine: {
        show: false, 
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: value.map((v) => v.name),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false, 
      },
      axisLabel: {
        fontSize: 14,
        fontWeight: 500,
        color: "#3C3E49",
        margin: 20,
      },
    },
    series: [
      {
        name: "Country Breakdown",
        type: "bar",
        label: {
          show: true,
          position: "insideLeft",
          formatter: "{c}%",
          padding: 10,
          fontSize: 14,
          fontWeight: 500,
        },
        data: value.map((v) => ({
          name: v.name,
          value: v.value,
        })),
        itemStyle: {
          borderRadius: [0, 4, 4, 0], 
          color: function (params) {
            const colors = [
              "#FFE28A",
              "#C4E3D8",
              "#DBA2F9",
              "#8986E7",
              "#FCBE72",
            ];
            return colors[params.dataIndex];
          },
        },
        barWidth: 30,
      },
    ],
    grid: {
      left: "14%",
      right: "10%",
      top: "5%",
      bottom: "5%",
    },
  };

  return (
    <div className="px-[20px] pb-[20px]">
      <ReactEcharts option={updatedOption} style={{ height: "400px" }} />
    </div>
  );
};

export default HorizontalLineGraph;
