import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from './TitleCard';
import {MonthlyRevenue} from "@/types/creators";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
    },
    scales: { // Added scales configuration
        x: {
            title: { display: true, text: 'Month' },
        },
        y: {
            title: { display: true, text: 'Revenue' },
            beginAtZero: true, // Start y-axis at 0
        }
    },
};

interface BarChartProps {
    monthlyRevenues: MonthlyRevenue[];
}

    const BarChart: React.FC<BarChartProps> = ({ monthlyRevenues }) => {

        // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = {
            labels: monthlyRevenues.map(rev => monthNames[rev.month - 1]),
            datasets: [
                {
                    label: 'Paid Post',
                    data: monthlyRevenues.filter(rev => rev.subscriptionType === 0).map(rev => rev.revenue),
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: 'Paid Chat',
                    data: monthlyRevenues.filter(rev => rev.subscriptionType === 1).map(rev => rev.revenue),
                    backgroundColor: 'rgba(53, 162, 235, 1)',
                },
                {
                    label: 'Paid Calls',
                    data: monthlyRevenues.filter(rev => rev.subscriptionType === 2).map(rev => rev.revenue),
                    backgroundColor: 'rgba(255, 206, 86, 1)',
                },
            ],
        };

    return (
        <TitleCard title={"Revenue"} topMargin={undefined} TopSideButtons={undefined}>
            <Bar options={options} data={data} />
        </TitleCard>
    );
}

export default BarChart;
