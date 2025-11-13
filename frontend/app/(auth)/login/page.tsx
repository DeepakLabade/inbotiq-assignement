"use client";
import axios from "axios";
import { useState } from "react";
import { IconEye, IconEyeClosed, IconEyeOff } from "@tabler/icons-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: FormData) => {
    if (!data.email || !data.password) {
      toast("plz enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.status === "ok") {
        toast("login successfully");
        setLoading(false);
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      console.log("login error: ", error);
      //@ts-ignore
      toast.error(error.response?.data?.msg || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-neutral-100">
      <Toaster />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-6 border border-gray-300 bg-white p-6 rounded-lg w-96 shadow-lg"
      >
        <div className="text-center text-2xl font-bold w-full">Login</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 ">
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="deepak@gmail.com"
              className="border border-gray-300 px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-3 focus:ring-gray-300 transition-all duration-300 ease-in-out"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-medium">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                // value={password}
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
              <p className="text-red-500 text-sm mb-2">
                {errors.password.type === "required"
                  ? "Password is required"
                  : "Password must be at least 6 characters"}
              </p>
            )}
          </div>
          <div className="reltative w-full flex flex-col gap-2">
            <button
              type="submit"
              className="border cursor-pointer border-black px-4 py-1.5 rounded-lg bg-black text-white font-semibold"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <p className="text-sm text-neutral-700 font-medium">
              Dont have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
