"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar/page";
import Header from "@/app/components/Header/page";
import { useRouter } from "next/navigation";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  // const { isAuthenticated } = useContext(AuthContext);

  const router = useRouter();
  const handleToggleSideBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <div className="flex justify-start h-[100vh]">
      <h2
        className="lg:hidden text-3xl absolute top-4 pl-3"
        onClick={handleToggleSideBar}
      >
        {/*<TfiMenu />*/}
      </h2>
      <div
        className={`${
          toggleSidebar ? "sm:block" : "hidden"
        }  h-screen w-[80%] lg:w-[20%] lg:block top-0 left-0`}
      >
        <h2
          className="absolute text-3xl top-6 pr-3 right-0 lg:hidden"
          onClick={handleToggleSideBar}
        >
          {/*<IoClose />*/}
        </h2>

        <Sidebar />
      </div>
      <main className="w-[100%] lg:w-[80%]">
        
        <div className="bg-white-200 p-4">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout;
