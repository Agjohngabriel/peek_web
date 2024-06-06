"use client";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {MdAddCircleOutline} from "react-icons/md";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import Pagination from "@/app/components/Pagination";
import {BASE_URL, GET_ALL_CREATORS} from "@/constant";
import DateRangePicker from "@/app/components/DateRangePicker";


export interface ExploreCreators {
    id:          string;
    dateOfBirth: Date;
    idScanned:   string;
    holdingId:   string;
    gender:      string;
    bio:         string;
    isApproved:  boolean;
    user:        User;
}

export interface User {
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default function Creators() {
    const router = useRouter();
    const [createors, setCreators] = useState<ExploreCreators[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2); // Or get from config
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [endDate, setEndDate] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [showConfiramation, setShowConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showIdDialog, setShowIdDialog] = useState(false);
    const [idImageUrl, setIdImageUrl] = useState("");
    // const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);

    // Check if username and token are present in session storage
    const username = cookie.get("username");
    const token = cookie.get("token");
    const buildQueryParams = (): URLSearchParams => {
        const params = new URLSearchParams({
            page: currentPage.toString(), // Convert to string
            pageSize: pageSize.toString(),
            searchQuery: searchQuery,
        });

        if (startDate) {
            params.append('startDate', startDate);
        }
        if (endDate) {
            params.append('endDate', endDate);
        }

        return params;
    };
    const handleDateRangeChange = (start: Date | null, end: Date | null) => {
        setStartDate(start ? start.toISOString().slice(0, 10) : ""); // Format to YYYY-MM-DD
        setEndDate(end ? end.toISOString().slice(0, 10) : "");
        fetchAllCreators();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Optional Debouncing
        if (typingTimeout) clearTimeout(typingTimeout); // Clear previous timeout
        setTypingTimeout(setTimeout(() => fetchAllCreators(), 500)); // 500ms delay
    };
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchAllCreators(); // Fetch data for the new page
    };

    const fetchAllCreators = () => {
        if (!username || !token) {
            router.push("/");
            return;
        }
        const queryParams = buildQueryParams();
        axios
            .get(`${GET_ALL_CREATORS}?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCreators(response.data.data.results);
                setTotalCount(response.data.data.totalCount);
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div
                    className="flex  flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <DateRangePicker
                        startDate={startDate ? new Date(startDate) : null}
                        endDate={endDate ? new Date(endDate) : null}
                        onChange={handleDateRangeChange}
                    />
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search"
                               className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search for creators"
                               value={searchQuery}
                               onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption
                        className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Creators
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of
                            Peek creators designed to help you work and play, stay organized, get answers, keep in
                            touch, grow your business, and more.</p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Firstname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Joined
                                <a href="#">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Email
                                <a href="#">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Date of Birth
                                <a href="#">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {createors.map((data) => <tr key={data.id}
                                                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={data.idScanned}
                                 alt="Jese image"/>
                            <div className="ps-3">
                                <div
                                    className="text-base font-semibold">{data.user.firstName} {data.user.lastName}</div>
                                <div className="font-normal text-gray-500">{data.user.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            {new Date(data.user.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </td>
                        <td className="px-6 py-4">
                            {data.user.email}
                        </td>
                        <td className="px-6 py-4">
                            {new Date(data.dateOfBirth).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
                        </td>
                        <td className="px-6 py-4">
                            {data.user.isActive ? "Active" : "Pending"}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => {
                                    setShowIdDialog(true);
                                    setIdImageUrl(data.idScanned);
                                }}
                                className="font-medium text-green dark:text-green-500 hover:underline mr-7">View Idcard
                            </button>
                            <a href="#"
                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                />
            </div>
            {/* eslint-disable-next-line react/jsx-no-undef */}


            <ConfirmationModal isVisible={showConfiramation} onClosed={() => setShowConfirmation(false)}>
                <h1 className="text-center bg-white py-8 px-4 rounded-md text-black">Creator approved successfully.</h1>
            </ConfirmationModal>

            {showIdDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute bg-black bg-opacity-50 inset-0"></div>
                    <div className="z-10 bg-white p-4 rounded-md max-w-[500px] max-h-[600px] overflow-auto relative">
                        <img src={idImageUrl} alt="ID Card" className="max-w-full max-h-full"/>
                        <div className="flex justify-center items-center w-full absolute bottom-0 left-0 bg-white p-2">
                            <button
                                className="flex gap-1 items-center text-mygreen-100 bg-yellow-600 p-3"
                                onClick={() => {
                                    setShowIdDialog(false);
                                    setIdImageUrl("");
                                }}
                            >Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
