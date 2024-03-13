"use client";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {MdAddCircleOutline} from "react-icons/md";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";


export interface User {
    id:          string;
    firstName:   string;
    lastName:    string;
    email:       string;
    isActive:    boolean;
    userProfile: UserProfile | null;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface UserProfile {
    userName:                 string;
    imageUrl:                 string;
    name:                     null;
    isCreatorProfile:         boolean;
    isCreatorAccountApproved: boolean;
}

export default function Creators() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [showConfiramation, setShowConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);

    // Check if username and token are present in session storage
    const username = cookie.get("username");
    const token = cookie.get("token");

    const fetchAllCreators = () => {
        if (!username || !token) {
            router.push("/");
            return;
        }

        axios
            .get("https://app.thepeekentertainment.com/api/Admin/GetAllUsers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    useEffect(() => {
        fetchAllCreators()
    }, [username, token, router]);

    const handleApproveCreator = (creatorId: string) => {
        setIsLoading(true);
        axios
            .get(
                `https://app.thepeekentertainment.com/api/Admin/ApproveCreator?creatorId=${creatorId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                // if the api returns a success message
                console.log(response.data, 'response successful')
                fetchAllCreators();
                setShowConfirmation(true);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error approving creator:", error);
            });
    };


    return (
        <div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <div className="flex justify-between items-start mb-10 py-2 border-b border-gray-300">
                <h1>All Users</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="w-[100%] text-[10px] md:text-[12px] bg-white-100 text-left min-w-full divide-y">
                    <thead className="bg-white-100 text-gray-450 py-4 font-light">
                    <tr className="border-b border-gray-200">
                        <th className="py-4 px-2 text-gray-350 tracking-wider">
                            Name
                        </th>
                        <th className="py-4 px-2 text-gray-350 tracking-wider">
                            Email
                        </th>
                        <th className="py-4 px-2 text-gray-350 tracking-wider">
                            Username
                        </th>
                        <th className="py-4 px-2 text-gray-350 tracking-wider">
                            Is Creator
                        </th>
                        {/*<th className="py-4 px-2 text-gray-350 tracking-wider">*/}
                        {/*    Gender*/}
                        {/*</th>*/}
                        {/*<th className="py-4 px-2 text-gray-350 tracking-wider text-right">*/}
                        {/*    Action*/}
                        {/*</th>*/}
                    </tr>
                    </thead>
                    <tbody className="min-w-full divide-y">
                    {users.map((data) => (
                        <tr
                            key={data.id}
                            className="border-b border-gray-200 cursor-pointer"
                        >
                            <td
                                className="py-4 px-2 whitespace-nowrap"
                            >
                                {data.firstName +  ' ' + data.lastName}
                            </td>
                            <td
                                className="py-4 px-2 whitespace-nowrap"
                            >
                                {data.email}
                            </td>
                            <td
                                className="py-4 px-2 whitespace-nowrap"
                            >
                                {data.firstName}
                            </td>
                            {/*<td*/}
                            {/*    className="py-4 px-2 whitespace-nowrap"*/}
                            {/*>*/}
                            {/*    {new Date(data.userProfile).toLocaleDateString('en-GB')}*/}
                            {/*</td>*/}
                            <td
                                className="py-4 px-2 whitespace-nowrap"
                            >
                                {data.userProfile?.isCreatorProfile == true ? "True":"False"}
                            </td>
                    {/*        <td className="flex justify-end py-4 px-2">*/}
                    {/*            <div>*/}
                    {/*<span*/}
                    {/*    className="flex gap-1 items-center text-mygreen-100 bg-yellow-600 p-3"*/}
                    {/*    onClick={() => data.isApproved ? {} : handleApproveCreator(data.id)}*/}
                    {/*>*/}
                    {/*  <span>{<MdAddCircleOutline />}</span>*/}
                    {/*    {*/}
                    {/*        isLoading ? <span>Loading ...</span> : <span>{data.isApproved ? "Approved" : "Approve"}</span>*/}
                    {/*    }*/}
                    {/*        </span>*/}
                    {/*            </div>*/}
                    {/*        </td>*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
