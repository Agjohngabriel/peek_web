import Link from "next/link";

interface AmountStatsProps {
    amountSubscribed: number;
    cashWithdrawn: number;
}
const AmountStats: React.FC<AmountStatsProps> = ({ amountSubscribed, cashWithdrawn }) => {
    return(
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Amount Subscribed</div>
                <div className="stat-value">${amountSubscribed}</div>
                <div className="stat-actions">
                    <Link href='/dashboard/creators' className="btn btn-xs">View Users</Link>
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Cash Withdrawn</div>
                <div className="stat-value">${cashWithdrawn}</div>
                <div className="stat-actions">
                    <Link href='/dashboard/creators' className="btn btn-xs">View Creators</Link>
                </div>
            </div>
        </div>
    )
}

export default AmountStats
