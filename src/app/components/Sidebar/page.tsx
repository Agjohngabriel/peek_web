"use client";
import React from 'react';
import Image from "next/image";
import {usePathname, useRouter} from 'next/navigation'
import Link from 'next/link';
import {routes} from "@/app/components/Sidebar/routes";
import {TbLogout} from "react-icons/tb";


interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar  = () =>{

    const routerName = usePathname()

    const router = useRouter()

    const handleLogout = () => {
        console.log("Logging out...");
        router.push("/v1");
    };

    return (
        <aside className="bg-gray-200 h-full flex flex-col px-6 transition-all duration-200">
            <div className="mb-10 pt-7 pl-2">
                <Image src="/logo.jpeg" width={100} height={100} alt=""/>
            </div>
            <ul className="mt-6">
                {routes.map((routeItem, index) => (
                    <Link key={index} href={routeItem.layout} prefetch>
                        <li className={`w-fit flex justify-start items-center py-4 rounded-md hover:text-darkBlue-100 hover:bg-white-100 px-6 ${
                            routerName === routeItem.layout ? 'text-darkBlue-100  ': 'text-gray-500'
                        }`}>
                            <span className="">{routeItem.icon}</span>
                            <span className="pl-2 text-sm font-medium">{routeItem.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex items-center mt-10 text-red-500 pl-1 cursor-pointer w-fit" onClick={handleLogout}>
                <span><TbLogout /></span>
                <span className="pl-5">Log Out</span>
            </div>
        </aside>
    );
};

export default Sidebar;
