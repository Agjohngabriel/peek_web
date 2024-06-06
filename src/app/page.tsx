"use client";
import Image from "next/image";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import { useState } from "react";
import {LOGIN_ENDPOINT} from "@/constant";
import api from "@/api";
import imageAsset from '@/app/components/logo.jpeg';

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
// use client
export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `${LOGIN_ENDPOINT}`,
        data
      );

      if (response.data.isSuccessful) {
        const { id, userName, token } = response.data.data;

        // Save username and token to session storage
        cookie.set("username", userName);
        cookie.set("token", token);

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle login failure (e.g., display error message)
        console.error("Login failed:", response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    // <div className="flex h-[100vh] flex-col  px-6 py-12 lg:px-8 bg-white">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8">
    //     <Image
    //       className="mx-auto h-10 w-auto"
    //       src="/logo.jpeg"
    //       alt="Peek Entertainment"
    //       width={400}
    //       height={400}
    //     />
    //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //       Sign in to your account
    //     </h2>
    //   </div>
    //
    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium leading-6 text-gray-900"
    //         >
    //           Email address
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             type="email"
    //             id="email"
    //             {...register("email")}
    //             className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
    //               errors.email ? "border-red-500" : ""
    //             }`}
    //           />
    //           {errors.email && (
    //             <p className="text-red-500 text-sm">{errors.email.message}</p>
    //           )}
    //         </div>
    //       </div>
    //
    //       <div>
    //         <div className="mt-1">
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium leading-6 text-gray-900"
    //         >
    //           Password
    //         </label>
    //           <input
    //             type="password"
    //             id="password"
    //             {...register("password")}
    //             className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
    //               errors.password ? "border-red-500" : ""
    //             }`}
    //           />
    //           {errors.password && (
    //             <p className="text-red-500 text-sm">
    //               {errors.password.message}
    //             </p>
    //           )}
    //         </div>
    //
    //         <button
    //           type="submit"
    //           className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           {isLoading ? (
    //            "Loading ....."
    //           ) : (
    //             "Sign in"
    //           )}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image
                      className="w-8 h-8 mr-2"
                   src={imageAsset}
                       alt="Peek Entertainment"
                      width={300}
                      height={300}
                   />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" {...register("email")} id="email" className={`bg-gray-50 border  ${ errors.email ? "border-red-500" : "border-gray-300" } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@company.com" required/>
                  {errors.email && (
                                 <p className="text-red-500 text-sm">{errors.email.message}</p>
                               )}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" {...register("password")} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  {errors.password && (
                                 <p className="text-red-500 text-sm">
                                   {errors.password.message}
                                 </p>
                               )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  {/*<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>*/}
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

                  {isLoading ? (
                                "Loading ....."
                               ) : (
                                "Sign in"
                             )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
