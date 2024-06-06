"use client";
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import DashboardTopBar from "@/app/components/DashboardTopBar";
import DashboardStats from "@/app/components/DashboardStats";
import LineChart from "@/app/components/LineChart";
import BarChart from "@/app/components/BarChart";
import AmountStats from "@/app/components/AmountStats";
import PageStats from "@/app/components/PageStats";
import UserChannels from "@/app/components/UserChannels";
import DoughnutChart from "@/app/components/DoughnutChart";
import React, {useEffect, useState} from "react";
import api from "@/api";
import {GET_CREATOR_By_Id, GetDashBoardData} from "@/constant";
import {AdminDashboardData} from "@/types/creators";
import Preloader from "@/app/components/Preloader";

function Dashboard(){

    const [dashboardData, setDashboardData] = useState<AdminDashboardData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showIdDialog, setShowIdDialog] = useState(false);
    const [showConfiramation, setShowConfirmation] = useState(false)
    const fetchCreatorDetails = async () => {
        try {
            const response = await api.get(
                `${GetDashBoardData}`
            );
            setDashboardData(response.data.data); // Axios directly gives you the typed data
        } catch (error) {
            setError(
                "An unexpected error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {

        fetchCreatorDetails();
    }, []);
    const statsData = [
        {title : "Creators", value : `${dashboardData?.totalCreators ?? 0}`, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
        {title : "Total Income", value : `$${dashboardData?.totalIncome ?? 0}`, icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
        {title : "Total Revenue", value : `$${dashboardData?.totalRevenue ?? 0}`, icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
        {title : "Active Users", value : `${dashboardData?.totalUsers ?? 0}`, icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
    ]


    const updateDashboardPeriod = () => {
        // Dashboard range changed, write code to refresh your values
        // dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
            {isLoading && <Preloader />} {/* Show Preloader if loading */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/>

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart monthlyRevenues={dashboardData?.monthlyRevenues ?? []}/>
            </div>

            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats amountSubscribed={dashboardData?.totalAmountSubscribed ?? 0} cashWithdrawn={dashboardData?.totalCashWithdrawn ?? 0}/>
                <PageStats totalLikes={dashboardData?.totalLikes ?? 0} totalSubscriptions={dashboardData?.totalSubscriptions ?? 0}/>
            </div>
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart PaidCalls={dashboardData?.totalPaidCallSubscriptions ?? 0} PaidChat={dashboardData?.totalPaidChatSubscriptions ?? 0} PaidPost={dashboardData?.totalPaidPostSubscriptions ?? 0}/>
            </div>
        </>
    )
}

export default Dashboard
