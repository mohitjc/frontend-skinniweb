import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ data }) => {
  // Create separate refs for each pie chart
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);

  // Extract relevant values from the API response
  const {
    consumeCalories,
    totalCalories,
    consumeProtein,
    totalProtein,
    consumeFat,
    totalFat,
  } = data;

  // Chart data for Calories, Protein, and Fat
  const chartData = [
    {
      source: [
        ['Category', 'Consumed', 'Total'],
        ['Consumed Calories', consumeCalories, totalCalories],
        ['Total Calories', totalCalories, totalCalories],
      ]
    },
    {
      source: [
        ['Category', 'Consumed', 'Total'],
        ['Consumed Protein', consumeProtein, totalProtein],
        ['Total Protein', totalProtein, totalProtein],
      ]
    },
    {
      source: [
        ['Category', 'Consumed', 'Total'],
        ['Consumed Fat', consumeFat, totalFat],
        ['Total Fat', totalFat, totalFat],
      ]
    }
  ];

  // Define the two colors for the charts
  const colors = ['#ffbc8f', '#828282'];

  useEffect(() => {
    // Initialize the first chart for Calories
    const myChart1 = echarts.init(chartRef1.current);
    myChart1.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          datasetIndex: 0,
          label: {
            show: false,
          },
          color: colors,  // Apply colors to the pie chart
        },
      ],
      dataset: chartData[0], // Data for the first chart (Calories)
    });

    // Initialize the second chart for Protein
    const myChart2 = echarts.init(chartRef2.current);
    myChart2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          datasetIndex: 0,
          label: {
            show: false,
          },
          color: colors,  // Apply colors to the pie chart
        },
      ],
      dataset: chartData[1], // Data for the second chart (Protein)
    });

    // Initialize the third chart for Fat
    const myChart3 = echarts.init(chartRef3.current);
    myChart3.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          datasetIndex: 0,
          label: {
            show: false,
          },
          color: colors,  // Apply colors to the pie chart
        },
      ],
      dataset: chartData[2], // Data for the third chart (Fat)
    });

    // Cleanup on component unmount
    return () => {
      myChart1.dispose();
      myChart2.dispose();
      myChart3.dispose();
    };
  }, [data]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Chart for Calories */}
      <div style={{ textAlign: 'center', width: '33%' }}>
        <div ref={chartRef1} style={{ height: '400px' }} />
        <h3>Calories</h3>
      </div>
      
      {/* Chart for Protein */}
      <div style={{ textAlign: 'center', width: '33%' }}>
        <div ref={chartRef2} style={{ height: '400px' }} />
        <h3>Protein</h3>
      </div>
      
      {/* Chart for Fat */}
      <div style={{ textAlign: 'center', width: '33%' }}>
        <div ref={chartRef3} style={{ height: '400px' }} />
        <h3>Fat</h3>
      </div>
    </div>
  );
};

export default PieChart;
