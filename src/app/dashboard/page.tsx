"use client";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "../components/modal/ConfirmationModal";


interface PackageData {
    gender: string;
    bio: string;
    isApproved: boolean;
    creatorId: string;
  }

export default function Dashboard() {
  const router = useRouter();
  const [packageData, setPackageData] = useState<PackageData[]>([]);
  const [showConfiramation, setShowConfirmation] = useState(false)

  // Check if username and token are present in session storage
  const username = cookie.get("username");
  const token = cookie.get("token");

  useEffect(() => {
    if (!username || !token) {
      router.push("/");
      return;
    }

    axios
      .get("http://157.245.4.44/api/Admin/GetAllCreators", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPackageData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [username, token, router]);

  const handleApproveCreator = (creatorId: string) => {
    axios
      .post(
        `http://157.245.4.44/api/Admin/ApproveCreator?creatorId=${creatorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // if the api returns a success message
        console.log(response.data, 'response successful')
        setShowConfirmation(true);
        console.log("Creator approved successfully.");
      })
      .catch((error) => {
        console.error("Error approving creator:", error);
      });
  };

  return (
    <div>
      <ConfirmationModal isVisible={showConfiramation} onClosed={()=> setShowConfirmation(false)}>
        <h1 className="text-center">Creator approved successfully.</h1>
      </ConfirmationModal>
      <div className="flex justify-between items-start mb-10 py-2 border-b border-gray-300">
        <h1>Business</h1>
        <span className="font-bold">
          <button
            className="text-white-100 bg-darkBlue-100 rounded-sm flex items-center py-3 pr-4 text-xs"
            onClick={() => {}}
          >
            <span>{/*<FaPlus className="w-10" />*/}</span>{" "}
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
            {packageData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
              >
                <td
                  className="py-4 px-2 whitespace-nowrap"
                  onClick={() => handleApproveCreator(data.creatorId)}
                >
                  {data.gender}
                </td>
                <td
                  className="py-4 px-2 whitespace-nowrap"
                  onClick={() => handleApproveCreator(data.creatorId)}
                >
                  {data.bio}
                </td>
                <td
                  className="py-4 px-2 whitespace-nowrap"
                  onClick={() => handleApproveCreator(data.creatorId)}
                >
                  {data.isApproved}
                </td>
                <td className="flex items-center py-4 px-2">
                  <div className="flex items-end ml-auto">
                    <span
                      className="flex gap-1 items-center text-mygreen-100"
                      onClick={() => {}}
                    >
                      <span>{/*<MdAddCircleOutline />*/}</span>
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
    </div>
  );
}
