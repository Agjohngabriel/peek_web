"use client";
import React, {useEffect, useState} from 'react';
import {ApproveCreator, GET_CREATOR_By_Id} from "@/constant";
import api from "@/api";
import axios from "axios";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";

const CreatorsDetail= ({ params }: { params: { creatorId: string } }) => {
    const creatorId = params.creatorId;
    const [showUploadManifest, setShowUploadManifest] = useState<boolean>(false);

    const [assignOrder, setAssignOrder] = useState<boolean>(false);

    const [creator, setCreator] = useState<CreatorDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showIdDialog, setShowIdDialog] = useState(false);
    const [showConfiramation, setShowConfirmation] = useState(false)
    const fetchCreatorDetails = async () => {
        try {
            const response = await api.get(
                `${GET_CREATOR_By_Id}?creatorId=${creatorId}`
            );
            setCreator(response.data.data); // Axios directly gives you the typed data
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
    const handleApproveCreator = async () => {
        setIsLoading(true);
        await api
            .get(
                `${ApproveCreator}?creatorId=${creatorId}`,
            )
            .then((response) => {
                // if the api returns a success message
                console.log(response.data, 'response successful')
                fetchCreatorDetails();
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
        {isLoading ? (
                <p>Loading Creators details...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : creator ? (<>
            <>
                <main className="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
                    <section className="relative block h-64">
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{backgroundImage: `url('${creator?.idScanned}')`}}>
                            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                            style={{transform: "translateZ(0px)"}}>
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                                 preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current"
                                         points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div
                                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-20 lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img alt="Profile" src={creator?.holdingId}
                                                     className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-40"/>
                                            </div>
                                        </div>
                                        <div
                                            className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                {creator?.isApproved ? <button
                                                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button">
                                                    Ban Account
                                                </button> : <button
                                                    onClick={() => handleApproveCreator()}
                                                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button">
                                                    Approve
                                                </button>}

                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                        <span
                                                            className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{creator?.subscriptionCount}</span><span
                                                    className="text-sm text-blueGray-400">Subscriber</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                        <span
                                                            className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{creator?.likeCount}</span><span
                                                    className="text-sm text-blueGray-400">Likes</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                        <span
                                                            className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{creator?.postCount}</span><span
                                                    className="text-sm text-blueGray-400">Post</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            {creator?.user.firstName} {creator?.user.lastName}
                                        </h3>
                                        <div
                                            className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            <button
                                                onClick={() => setShowIdDialog(true)}
                                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button">
                                                View Id
                                            </button>
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Email
                                            - {creator?.user.email}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-10">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Date
                                            Of Birth - {new Date(creator!.dateOfBirth).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Gender
                                            - {creator?.gender}
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    {creator?.bio}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
                </>) : (
                <p>Order not found.</p>
            )
        }
            {showIdDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute bg-black bg-opacity-50 inset-0"></div>
                    <div className="z-10 bg-white p-4 rounded-md max-w-[500px] max-h-[600px] overflow-auto relative">
                        <img src={creator?.idScanned} alt="ID Card" className="max-w-full max-h-full"/>
                        <div className="flex justify-center items-center w-full absolute bottom-0 left-0 bg-white p-2">
                            <button
                                className="flex gap-1 items-center text-mygreen-100 bg-yellow-600 p-3"
                                onClick={() => {
                                    setShowIdDialog(false);
                                }}
                            >Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmationModal isVisible={showConfiramation} onClosed={() => setShowConfirmation(false)}>
                <h1 className="text-center bg-white py-8 px-4 rounded-md text-black">Creator approved successfully.</h1>
            </ConfirmationModal>
        </div>
    );
}

export default CreatorsDetail;
