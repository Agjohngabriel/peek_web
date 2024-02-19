"use client";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import {MdAddCircleOutline} from "react-icons/md";


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

export default function Dashboard() {
  const router = useRouter();
  const [createors, setCreators] = useState<ExploreCreators[]>([]);
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
          .get("http://157.245.4.44/api/Admin/GetAllCreators", {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          .then((response) => {
              setCreators(response.data.data);
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
        `http://157.245.4.44/api/Admin/ApproveCreator?creatorId=${creatorId}`,
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
      <ConfirmationModal isVisible={showConfiramation} onClosed={()=> setShowConfirmation(false)}>
        <h1 className="text-center bg-white py-8 px-4 rounded-md text-black">Creator approved successfully.</h1>
      </ConfirmationModal>
      <div className="flex justify-between items-start mb-10 py-2 border-b border-gray-300">
        <h1>Creators</h1>
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
                  Date of Birth
              </th>
              <th className="py-4 px-2 text-gray-350 tracking-wider">
                  Gender
              </th>
              <th className="py-4 px-2 text-gray-350 tracking-wider text-right">
                  Action
              </th>
          </tr>
          </thead>
            <tbody className="min-w-full divide-y">
            {createors.map((data) => (
                <tr
                    key={data.id}
                    className="border-b border-gray-200 cursor-pointer"
                >
                    <td
                        className="py-4 px-2 whitespace-nowrap"
                    >
                        {data.user.firstName +  ' ' + data.user.lastName}
                    </td>
                    <td
                        className="py-4 px-2 whitespace-nowrap"
                    >
                        {data.user.email}
                    </td>
                    <td
                        className="py-4 px-2 whitespace-nowrap"
                    >
                        {data.user.firstName}
                    </td>
                    <td
                        className="py-4 px-2 whitespace-nowrap"
                    >
                        {new Date(data.dateOfBirth).toLocaleDateString('en-GB')}
                    </td>
                    <td
                        className="py-4 px-2 whitespace-nowrap"
                    >
                        {data.gender}
                    </td>
                    <td className="flex justify-end py-4 px-2">
                        <div>
                    <span
                        className="flex gap-1 items-center text-mygreen-100 bg-yellow-600 p-3"
                        onClick={() => data.isApproved ? {} : handleApproveCreator(data.id)}
                    >
                      <span>{<MdAddCircleOutline />}</span>
                        {
                            isLoading ? <span>Loading ...</span> : <span>{data.isApproved ? "Approved" : "Approve"}</span>
                        }
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
