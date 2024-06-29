"use client"
import { topicsArray } from "@/utils/topicsArray"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
function Index() {

    const [scrollAmt, setScrollAmt] = useState(0)
    useEffect(()=>{
        addEventListener('scroll',()=>setScrollAmt(Math.trunc(window.scrollY)))
    },[])
    
    return (

        <section className="relative overflow-hidden select-none">
            <div className="w-[40vw] h-[40vh] fixed top-0 right-[10vw] rounded-full bg-[#98f] blur-[40vw] sm:blur-[30vw] md:blur-[20vw]" />

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

            <main className="w-full p-[5vw]">
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-[10vw] md:gap-[4vw]">
                    <div className="lg:w-[60%] md:text-xl lg:text-2xl xl:text-3xl animate-[opac_3s]">
                        <div className="font-bold pb-2">Welcome to Resolve,</div>
                        Your go-to platform for insightful discussions on a wide range of topics.
                        Resolve is designed to connect curious minds with knowledgeable individuals from various fields and communities.
                        Whether you&apos;re seeking solutions, exploring diverse perspectives, or simply sharing your expertise,
                        Resolve provides a space where questions find answers and where meaningful conversations thrive.
                        Join our vibrant community today.
                    </div>
                    <Image src="/img/index1.png" alt="" width={400} height={400} priority={true} className="bg-gradient-to-tr from-[#308] via-[#63f] to-[#98f] animate-[opac_3s] border-8 border-[#fff8] z-50" />
                </div>
                <div className={`w-full pt-10 md:pt-40 flex flex-col md:flex-row justify-around items-center gap-[10vw] md:gap-[4vw] opacity-5 duration-1000 ${scrollAmt > 160 && 'opacity-[1]'}`}>
                    <Image src="/img/index2.jpg" alt="" width={400} height={400} className="animate-[opac_3s] border-8 border-[#fff8]" />
                    <div className="font-extrabold text-center text-[16vw] md:text-[8vw] leading-none bg-gradient-to-r from-[#98f] to-white bg-clip-text text-transparent">
                        From Users,<br />To Users.
                    </div>
                </div>
                <div className={`md:mx-[4vw] my-[10vw] border-2 md:border-4 lg:border-8 grid grid-cols-4 relative overflow-hidden break-words opacity-10 duration-[2s] ${scrollAmt > 600 && 'opacity-[1]'}`}>
                    {topicsArray.map(
                        (i) => {
                            return <div className="topic xs:text-[0.6rem] sm:text-[0.8rem] md:text-[1.2rem] text-center" key={i}>{i}</div>
                        }
                    )}
                    <div className={`w-full h-full absolute flex justify-center items-center top-0 left-0 opacity-0 duration-[2s] ${scrollAmt > 700 && 'opacity-100'}`}>
                        <div className="absolute w-[60%] xs:h-12 sm:h-24 md:h-40 text-[6vw] xs:blur-lg sm:blur-xl md:blur-2xl bg-[#98f5]" />
                        <div className="absolute xs:text-[9vw] font-extrabold text-[#fff6]">COMPREHENSIVE</div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Index