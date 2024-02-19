"use client";
import Image from "next/image";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import { useState } from "react";

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
      const response = await axios.post(
        "http://157.245.4.44/api/Auth/Login",
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
    <div className="flex h-[100vh] flex-col  px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8">
        <Image
          className="mx-auto h-10 w-auto"
          src="/logo.jpeg"
          alt="Peek Entertainment"
          width={400}
          height={400}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="mt-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
               "Loading ....."
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
