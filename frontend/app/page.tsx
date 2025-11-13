"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center h-auto rounded-2xl z-50 text-white fixed left-1/2 -translate-x-1/2 top-2 bg-transparent">
        <div className="flex justify-between items-center py-4 px-8 w-5xl bg-neutral-200/15 rounded-2xl">
          <div className="px-4 py-2 rounded-lg text-3xl font-semibold bg-neutral-500/40">
            Inbotiq
          </div>
          <div className="flex font-medium gap-5">
            <p>Home</p>
            <p>Our Agents</p>
            <p>Custom Agents</p>
          </div>
          <div className="flex items-center cursor-pointer gap-2 font-semibold">
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                router.push("/register");
              }}
              className="bg-blue-400 h-8 cursor-pointer rounded-md text-white px-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative w-full min-h-screen bg-[#0a0f1f] 
            bg-[radial-gradient(circle_at_top,_rgba(72,41,255,0.25),_transparent_70%)]
            text-white overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15] 
                bg-[linear-gradient(to_right,#2a2f4a_1px,transparent_1px),linear-gradient(to_bottom,#2a2f4a_1px,transparent_1px)] 
                bg-[size:40px_40px]"
        ></div>

        <div className="relative z-10 top-26 h-auto ">
          <div className="flex w-full justify-center">
            <div className="bg-neutral-100/10 px-7 py-3 border border-neutral-500 rounded-full flex items-center gap-1 text-xs">
              Next gen AI platform{" "}
              <div className="h-1 w-1 rounded-full bg-white"></div>Now Available
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 items-center mt-10">
            <span className="text-8xl font-extrabold">AI Agents</span>
            <span className="text-8xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#56A1FF] to-[#FA65B8] ">
              That Actually
            </span>
            <span className="text-8xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#1DB5EE] to-[#0CD097]">
              Think
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="mt-34 flex justify-center">
            <p className="text-xl text-neutral-300 max-w-3xl text-center">
              Deploy enterprise-grade AI agents that understand your business,
              learn from every interaction, and scale effortlessly. Join the AI
              revolution that's transforming how companies work.
            </p>
          </div>
          <div className="flex justify-center">
            <button className="text-md font-medium bg-linear-to-r from-[#225CFC] to-[#9518FA] px-9 rounded-xl py-4">
              Start Building Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
