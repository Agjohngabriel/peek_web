"use client";
import { useRouter } from 'next/navigation';
import cookie from "js-cookie";
import DefaultLayout from "@/app/dashboard/layout";
import {Package} from "@/types/creators";

// use client

const packageData: Package[] = [
    {
        name: 'Free package',
        price: 0.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Paid',
    },
    {
        name: 'Standard Package',
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Paid',
    },
    {
        name: 'Business Package',
        price: 99.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Unpaid',
    },
    {
        name: 'Standard Package',
        price: 59.0,
        invoiceDate: `Jan 13,2023`,
        status: 'Pending',
    },
];
export default function Dashboard() {
    const router = useRouter();

    // Check if username and token are present in session storage
    const username = cookie.get('username');
    const token = cookie.get('token');

    if (!username || !token) {
        router.push('/');
        return null;
    }

    return (
        <>
            <DefaultLayout>
                <div className="flex justify-between items-start mb-10 py-2 border-b border-gray-300">
                    <h1>Business</h1>
                    <span className="font-bold">
            <button
                className="text-white-100 bg-darkBlue-100 rounded-sm flex items-center py-3 pr-4 text-xs"
                onClick={() => {}}
            >
              <span>
                {/*<FaPlus className="w-10" />*/}
              </span>{" "}
                <span>Add Business</span>
            </button>
          </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-[100%] text-[10px] md:text-[12px] bg-white-100 text-left min-w-full divide-y">
                        <thead className="bg-white-100 text-gray-450 py-4 font-light">
                        <tr className="border-b border-gray-200">
                            <th className="py-4 px-2 text-gray-350 tracking-wider">
                                Business Name
                            </th>
                            <th className="py-4 px-2 text-gray-350 tracking-wider">
                                No. of Tons
                            </th>
                            <th className="py-4 px-2 text-gray-350 tracking-wider">
                                Address
                            </th>
                            <th className="py-4 px-2 text-gray-350 tracking-wider text-right">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody className="min-w-full divide-y">
                        {packageData.map((data) => (
                            <tr
                                key={data.name}
                                className="border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
                            >
                                <td
                                    className="py-4 px-2 whitespace-nowrap"
                                    onClick={() =>
                                        router.push("/v1/businesses/business-details")
                                    }
                                >
                                    {data.name}
                                </td>
                                <td
                                    className="py-4 px-2 whitespace-nowrap"
                                    onClick={() =>
                                        router.push("/v1/businesses/business-details")
                                    }
                                >
                                    {data.price}
                                </td>
                                <td
                                    className="py-4 px-2 whitespace-nowrap"
                                    onClick={() =>
                                        router.push("/v1/businesses/business-details")
                                    }
                                >
                                    {data.status}
                                </td>
                                <td className="flex items-center py-4 px-2">
                                    <div className="flex items-center ml-auto">
                      <span
                          className="flex gap-1 items-center text-mygreen-100"
                          onClick={() => {}}
                      >
                        <span>
                          {/*<MdAddCircleOutline />*/}
                        </span>
                        <span>Add Route</span>
                      </span>
                                        <span
                                            className="text-darkBlue-100 cursor-pointer mx-3 "
                                            onClick={() => {}}
                                        >
                        {/*<FaRegEdit />*/}
                      </span>
                                        <span
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => {}}
                                        >
                        {/*<RiDeleteBin6Line />*/}
                      </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </DefaultLayout>
        </>
    );
}