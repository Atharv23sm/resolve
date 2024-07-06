"use client";
import { useEffect, useState } from "react";
import { topicsArray } from "@/utils/topicsArray";
import Link from "next/link";

function Index() {
  const [scrollAmt, setScrollAmt] = useState(0);
  useEffect(() => {
    addEventListener("scroll", () => setScrollAmt(Math.trunc(window.scrollY)));
  }, []);

  return (
    <section className="relative overflow-hidden select-none">
      <div className="w-[40vw] h-[40vh] fixed z-0 bottom-0 right-0 rounded-full bg-[#30f] blur-[30vw] md:blur-[20vw] lg:blur-[10vw] animate-[motion_10s_infinite]" />
      <div className="w-[30vw] h-[30vh] fixed z-0 bottom-[10vw] right-[30vw] rounded-full bg-[#60f] blur-[20vw] md:blur-[16vw] lg:blur-[8vw] animate-[motion_12s_infinite]" />
      <div className="w-[20vw] h-[20vh] fixed z-0 bottom-[20vw] right-[50vw] rounded-full bg-[#70f] blur-[20vw] md:blur-[16vw] lg:blur-[8vw] animate-[motion_10s_infinite]" />

      <nav className="p-[2rem_4vw] flex justify-between items-center">
        <div className="w-max px-2 md:px-3 border-2 md:border-4 text-[1.4rem] md:text-[2rem] font-extrabold">
          Resolve
        </div>
        <div className="space-x-[4vw] flex">
          <Link href="/signup">
            <button className="p-[0.7vw_2vw] border-2 md:border-4 bg-[#42d] hover:bg-[#74f] duration-500 relative overflow-hidden group flex justify-center items-center">
              <div className="absolute w-full h-full bg-[#caf] blur-lg -translate-x-[9rem] group-hover:translate-x-[9rem] duration-700" />
              Join us
            </button>
          </Link>
          <Link href="/login">
            <button className="p-[0.7vw_2vw] border-2 md:border-4 hover:bg-[#42d] duration-500 border-[#fff5]">
              Sign in
            </button>
          </Link>
        </div>
      </nav>

      <main className="space-y-32 py-[20vw] md:py-[8vw]">
        <div className="space-y-20 md:space-y-32 text-center">
          <div className="font-bold text-[10vw] md:text-[7vw] animate-[opac_3s] tracking-tight leading-none mix-blend-lighten">
            <span className="text-[#fff8]">Welcome to </span>Resolve
          </div>
          <div className="animate-[opac_6s] md:text-xl lg:text-2xl px-[5vw] md:px-[16vw] mix-blend-lighten">
            Your go-to platform for insightful discussions on a wide range of
            topics. Resolve is designed to connect curious minds with
            knowledgeable individuals from various fields and communities.
            Whether you&apos;re seeking solutions, exploring diverse
            perspectives, or simply sharing your expertise, Resolve provides a
            space where questions find answers and where meaningful
            conversations thrive. Join our vibrant community today.
          </div>
        </div>
        <hr />
        <div
          className={`index-title md:opacity-5 text-[10vw] md:text-[6vw] ${
            scrollAmt > 300 && "md:opacity-[1]"
          }`}
        >
          Unlock <span className="text-[#fff8]">your quest for answers</span>
        </div>
        <hr />
        <div
          className={`index-title md:opacity-5 text-[13vw] md:text-[7vw] ${
            scrollAmt > 650 && "md:opacity-[1]"
          }`}
        >
          <span className="text-[#fff8]">From </span>Users,
          <span className="text-[#fff8]">To </span>Users.
        </div>
        <hr />
        <div
          className={`index-title md:opacity-5 text-[11vw] md:text-[6vw] ${
            scrollAmt > 1100 && "md:opacity-[1]"
          }`}
        >
          <span className="text-[#fff8]">Ask </span>anything.
        </div>
        <div
          className={`mx-[4vw] border-2 md:border-4 lg:border-8 grid grid-cols-4 relative overflow-hidden break-words md:opacity-10 duration-[2s] mix-blend-lighten ${
            scrollAmt > 1200 && "md:opacity-[1]"
          }`}
        >
          {topicsArray.map((i) => {
            return (
              <div
                className="topic xs:text-[0.6rem] sm:text-[0.8rem] md:text-[1.2rem] text-center"
                key={i}
              >
                {i}
              </div>
            );
          })}
          <div
            className={`w-full h-full absolute flex justify-center items-center top-0 left-0 md:opacity-0 duration-[2s] ${
              scrollAmt > 1520 && "md:opacity-100"
            }`}
          >
            <div className="absolute text-[9vw] font-extrabold text-[#fff6]">
              COMPREHENSIVE
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Index;
