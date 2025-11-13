import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  username: String;
  email: String;
  role: String;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const user = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/me`,
          {
            withCredentials: true,
          }
        );
        console.log(user.data.user.email);
        setUser(user.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  async function handleLogout() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      router.push("/login");
    } catch (error) {
      console.log("error while loggin out: " + error);
    }
  }

  return (
    <div className="w-full h-20 border border-b-neutral-200">
      <div className="flex justify-between px-16 h-full items-center">
        <div className="text-2xl flex font-medium ">
          <p>Welcome,</p>
          {loading ? (
            <p className="">Loading...</p>
          ) : (
            <p>
              <span className="text-neutral-600">{user?.email}</span> (
              {user?.role})
            </p>
          )}
        </div>
        <button
          className="border rounded-lg px-6 py-2 bg-neutral-200 cursor-pointer"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Header;
