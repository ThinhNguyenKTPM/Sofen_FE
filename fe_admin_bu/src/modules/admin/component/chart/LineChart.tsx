import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js/auto";
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export interface LineChartData{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;

}
export interface LineChartProps {
    label: string[] | undefined;
    data: LineChartData[] | LineChartData,
    title: string;
}
const LineChart = ({label, data, title} : LineChartProps) => {
    return (
        <Line
            data={{
                labels: label,
                datasets: data
            }}
            options={{
                elements: {
                    line: {
                        tension: 0.5 // Reducing line curvature
                    }
                },
                plugins: {
                    legend:{
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: title,
                        align: 'center',
                        font: {
                            size: 16
                        },
                    }
                },
            }}
        />
    )
};

export default LineChart;
