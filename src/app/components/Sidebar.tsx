"use client"
import { HiBars3BottomLeft } from "react-icons/hi2";
import { BsArrowLeftSquare } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { topicsArray } from "@/utils/topicsArray";
import { GrSearch } from "react-icons/gr";

export default function Sidebar() {

    const [showSidebar, setShowSidebar] = useState(false)
    const [search, setSearch] = useState("")
    const router = useRouter()

    return (
        <>
            <div className={`absolute h-full bg-black overflow-x-hidden overflow-y-scroll top-0 left-0 z-20 ${showSidebar ? 'ml-0' : '-ml-[50vw]'} md:ml-0 w-[50vw] md:w-[25vw] lg:w-[20vw] border-r-2 border-b-2 border-[#fff4] p-4 duration-300`}>
                <div className='text-lg md:text-2xl font-extrabold leading-none'>Topics</div>
                <div className="space-y-2 flex flex-wrap py-4">
                    <div className="w-full flex gap-4 items-center">
                        <input type="search" placeholder="search topic" className="w-full p-2 outline-none bg-[#222]" onChange={(e:any)=>setSearch(e.target.value)}/>
                        <GrSearch size={24} className="cursor-pointer" onClick={() =>{search!="" && router.push(`/home/topic/${search}`)}}/>
                    </div>
                    {search.length>0 && <div>Search for &quot;{search}&quot;</div>}
                    {topicsArray.filter(i => i.toLowerCase().indexOf(search.toLowerCase())==0).map(
                        (t) => {
                            return (
                                <div className="w-full p-1 md:p-2 hover:bg-[#53f] duration-700 cursor-pointer" key={t} onClick={() => router.push(`/home/topic/${t}`)}>
                                    <div className="text-sm md:text-md lg:text-lg">{t}</div>
                                </div>
                            )
                        }
                    )}
                </div>
                <BsArrowLeftSquare className="absolute top-4 right-4 cursor-pointer md:hidden" size={20} onClick={() => setShowSidebar(false)} />
            </div>
            <div className="absolute top-0 left-0">
                <HiBars3BottomLeft className="absolute top-2 left-2 cursor-pointer md:hidden" size={24} onClick={() => setShowSidebar(true)} />
            </div>
        </>
    )
}
