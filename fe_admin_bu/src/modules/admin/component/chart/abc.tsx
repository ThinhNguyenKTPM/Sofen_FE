// import {Chart as ChartJS} from "chart.js/auto";
// import {Line} from "react-chartjs-2";
// import {useEffect, useRef} from "react";
//
// // Set global default options for all charts
// ChartJS.defaults.maintainAspectRatio = false;
// ChartJS.defaults.responsive = true;
// ChartJS.defaults.plugins.title.display = true;
// ChartJS.defaults.plugins.title.align = 'start';
// ChartJS.defaults.plugins.title.font.size = 20; // Correcting this line to set font size
// ChartJS.defaults.plugins.title.color ='orange';
// export interface LineChartData{
//     label: string;
//     data: number[];
//     backgroundColor: string;
//     borderColor: string;
//
// }
// export interface LineChartProps {
//     label: string[] | undefined;
//     data: LineChartData[] | LineChartData,
//     title: string;
// }
// const LineChart = ({label, data, title} : LineChartProps) => {
//     const chartRef = useRef<any>(null); // Correcting the type of chartRef
//
//     useEffect(() => {
//         return () => {
//             if (chartRef.current) {
//                 (chartRef.current as any).chartInstance.destroy(); // Correcting the destroy method
//             }
//         };
//     }, []);
//     console.log(data);
//     return (
//         <Line
//             data={{
//                 labels: label,
//                 datasets: data
//             }}
//             options={{
//                 elements: {
//                     line: {
//                         tension: 0.5 // Reducing line curvature
//                     }
//                 },
//                 plugins: {
//                     legend:{
//                         position: 'bottom'
//                     },
//                     title: {
//                         display: true,
//                         text: title,
//                         align: 'center',
//                         font: {
//                             size: 20
//                         },
//                     }
//                 },
//             }}
//         />
//     )
// };
//
// export default LineChart;
