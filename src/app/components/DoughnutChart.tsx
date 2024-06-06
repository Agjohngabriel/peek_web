import {
    Chart as ChartJS,
    Filler,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from './TitleCard';

ChartJS.register(ArcElement, Tooltip, Legend, Filler);

const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top', // TypeScript knows 'top' is a valid value
        },
    },
};

const labels = ['Paid Post', 'Paid Chat', 'Paid Calls'];
interface DoughnutChartProps {
    PaidPost: number;
    PaidChat: number;
    PaidCalls: number;
}

    const DoughnutChart: React.FC<DoughnutChartProps> = ({ PaidPost, PaidCalls,PaidChat }) => {

        const data = {
        labels,
        datasets: [
            {
                label: '# of Orders',
                data: [PaidPost, PaidChat, PaidCalls],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }
        ],
    };
    return (
        <TitleCard title="Orders by Category" topMargin={undefined} TopSideButtons={undefined}>
            <Doughnut options={options} data={data} />
        </TitleCard>
    );
}

export default DoughnutChart;
