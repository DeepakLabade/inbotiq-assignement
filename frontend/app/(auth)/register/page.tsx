"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

type RegisterFormData = {
  email: string;
  password: string;
  role: "user" | "admin";
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/register`,
        data,
        { withCredentials: true }
      );
      toast.success("Registration successful");
      console.log(res.data);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div className="flex flex-col">
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="border border-gray-300 px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-3  focus:ring-gray-300 transition-all duration-300 ease-in-out"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              className="border border-gray-300 px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-3  focus:ring-gray-300 transition-all duration-300 ease-in-out"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            <button
              onClick={() => setShowPassword(() => !showPassword)}
              type="button"
              className="absolute -translate-y-1/2 top-1/2 cursor-pointer right-2"
            >
              {showPassword ? (
                <IconEye color="gray" />
              ) : (
                <IconEyeClosed color="gray" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.type === "required"
                ? "Password is required"
                : "Password must be at least 6 characters"}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Role</label>
          <select
            className="border border-gray-300 px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-3  focus:ring-gray-300 transition-all duration-300 ease-in-out"
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <div className="w-full relative flex flex-col gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`bg-black text-white w-full font-semibold py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition ${
              loading ? "pointer-events-none bg-neutral-700" : ""
            }`}
          >
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="text-sm text-neutral-700 font-medium">
            already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
