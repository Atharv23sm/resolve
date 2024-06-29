"use client"
import { topicsArray } from "@/utils/topicsArray"
import Link from "next/link"
import { useEffect, useState } from "react"
function Index() {

    const [scrollAmt, setScrollAmt] = useState(0)
    useEffect(() => {
        addEventListener('scroll', () => setScrollAmt(Math.trunc(window.scrollY)))
    }, [])

    return (

        <section className="relative overflow-hidden select-none">
            <div className="w-[40vw] h-[40vh] fixed z-0 bottom-0 right-0 rounded-full bg-[#75f] blur-[30vw] md:blur-[20vw] lg:blur-[10vw] animate-[motion_6s_infinite]" />
            <div className="w-[30vw] h-[30vh] fixed z-0 bottom-[10vw] right-[30vw] rounded-full bg-[#65f] blur-[20vw] md:blur-[16vw] lg:blur-[8vw] animate-[motion_10s_infinite]" />
            <div className="w-[20vw] h-[20vh] fixed z-0 bottom-0 right-[50vw] rounded-full bg-[#53f] blur-[10vw] md:blur-[8vw] lg:blur-[6vw] animate-[motion_8s_infinite]" />

            <nav className="w-full px-[4vw] py-8 flex justify-between items-center">
                <div className="w-max px-2 md:px-3 border-2 md:border-4 text-[1.4rem] md:text-[2rem] font-extrabold">Resolve</div>
                <div className="flex xs:gap-4 sm:gap-8 md:gap-10">
                    <Link href="/signup">
                        <button className="px-[2vw] py-[1vw] md:py-[0.7vw] border-2 md:border-4 bg-[#53f8] hover:bg-[#53f] duration-500 relative overflow-hidden group flex justify-center items-center">
                            <div className="absolute w-full h-full bg-white blur-lg -translate-x-[9rem] group-hover:translate-x-[9rem] duration-700" />
                            Join us
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="px-[2vw] py-[1vw] md:py-[0.7vw] border-2 md:border-4 hover:bg-[#53f8] duration-500 border-[#fff5]">
                            Sign in
                        </button>
                    </Link>
                </div>
            </nav>

            <main className="w-full space-y-32 py-[20vw] md:py-[10vw]">
                <div className="space-y-20 md:space-y-32 text-center md:text-xl lg:text-2xl">
                    <div className="font-bold text-center text-[10vw] md:text-[7vw] animate-[opac_3s] tracking-tight mix-blend-lighten">
                        <span className="text-[#fff8]">Welcome to </span>Resolve
                    </div>
                    <div className="animate-[opac_6s] px-[5vw] md:px-[16vw] mix-blend-lighten">
                        Your go-to platform for insightful discussions on a wide range of topics.
                        Resolve is designed to connect curious minds with knowledgeable individuals from various fields and communities.
                        Whether you&apos;re seeking solutions, exploring diverse perspectives, or simply sharing your expertise,
                        Resolve provides a space where questions find answers and where meaningful conversations thrive.
                        Join our vibrant community today.
                    </div>
                </div>
                <hr />
                <div className={`index-title md:opacity-5 text-[10vw] md:text-[6vw] ${scrollAmt > 250 && 'md:opacity-[1]'}`}>
                    Unlock <span className="text-[#fff8]">your quest for answers</span>
                </div>
                <hr />
                <div className={`index-title md:opacity-5 text-[13vw] md:text-[7vw] ${scrollAmt > 650 && 'md:opacity-[1]'}`}>
                    <span className="text-[#fff8]">From </span>Users,<span className="text-[#fff8]">To </span>Users.
                </div>
                <hr />
                <div className={`index-title md:opacity-5 text-[11vw] md:text-[6vw] ${scrollAmt > 1100 && 'md:opacity-[1]'}`}>
                    <span className="text-[#fff8]">Ask </span>anything.
                </div>
                <div className={`mx-[4vw] border-2 md:border-4 lg:border-8 grid grid-cols-4 relative overflow-hidden break-words md:opacity-10 duration-[2s] mix-blend-lighten ${scrollAmt > 1400 && 'md:opacity-[1]'}`}>
                    {topicsArray.map(
                        (i) => {
                            return <div className="topic xs:text-[0.6rem] sm:text-[0.8rem] md:text-[1.2rem] text-center" key={i}>{i}</div>
                        }
                    )}
                    <div className={`w-full h-full absolute flex justify-center items-center top-0 left-0 md:opacity-0 duration-[2s] ${scrollAmt > 1520 && 'md:opacity-100'}`}>
                        <div className="absolute xs:text-[9vw] font-extrabold text-[#fff6]">COMPREHENSIVE</div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Index