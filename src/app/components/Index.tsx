import Link from "next/link"
function Index() {
    return (
        <section className="relative overflow-hidden select-none">
            <div className="w-[40vw] h-[40vh] absolute top-0 right-[10vw] rounded-full bg-[#98f] blur-[40vw] sm:blur-[30vw] md:blur-[20vw]" />

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
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[10vw] md:gap-[4vw]">
                    <div className="md:w-[60%] md:text-xl lg:text-2xl xl:text-3xl animate-[opac_3s]">
                        <span className="font-bold">Welcome to Resolve,</span><br />
                        Your go-to platform for insightful discussions and expert advice on a wide range of topics.
                        Resolve is designed to connect curious minds with knowledgeable individuals from various fields and communities.
                        Whether you're seeking practical solutions, exploring diverse perspectives, or simply sharing your expertise,
                        Resolve provides a space where questions find answers and where meaningful conversations thrive.
                        Join our vibrant community today.
                    </div>
                    <div className="w-[80vw] h-[500px] sm:w-[400px] sm:h-[360px] md:w-[600px] md:h-[400px] 
                    -mr-40 sm:-mr-80 md:-mr-40 xs:text-xs sm:text-sm md:text-md border-4 border-[#fff8] 
                    bg-[#64f] p-4 flex flex-col gap-8 relative overflow-hidden animate-[slide1_2s]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0000_70%] to-[#64f]" />
                        <div className="flex justify-between">
                            <div className="size-8 md:size-10 rounded-full bg-white" />
                            <div className="w-[82%] bg-[#31a] p-4">How can I improve my productivity while working from home?</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>4 Replies</div>
                            <div className="w-[70%] h-[1px] bg-white" />
                        </div>
                        <div className="flex justify-between">
                            <div className="size-8 md:size-10 rounded-full bg-white" />
                            <div className="w-[82%] bg-[#115] p-4">Improving productivity while working from home can be achieved through a combination of strategies tailored to your work style and environment. Here are a few tips that can help:
                                <br /><br />1. Create a dedicated workspace: Designate a specific area in your home where you can work without distractions. Ensure it's comfortable, well-lit, and organized with all the tools and materials you need.
                                <br /><br />2. Establish a Routine: Set a regular schedule and stick to it. This includes waking up at the same time each day, starting work at a consistent hour, and scheduling breaks.
                                <br /><br />3 .Set Clear Goals: Outline what you need to accomplish each day or week. Breaking tasks into smaller, manageable chunks can make them less overwhelming.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-20 flex flex-col md:flex-row justify-between items-center gap-[10vw] md:gap-[4vw]">
                    <div className="w-[80vw] h-[500px] sm:w-[400px] sm:h-[360px] md:w-[600px] md:h-[400px] 
                    -ml-36 sm:-ml-[50vw] md:-ml-24 lg:-ml-32 xs:text-xs sm:text-sm md:text-md border-4 border-[#fff8] 
                    bg-[#64f] p-4 flex flex-col gap-8 relative overflow-hidden animate-[slide2_3s]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0000_70%] to-[#64f]" />
                        <div className="flex justify-between">
                            <div className="size-8 md:size-10 rounded-full bg-white" />
                            <div className="w-[82%] bg-[#31a] p-4">What are some must-watch movies?</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>16 Replies</div>
                            <div className="w-[70%] h-[1px] bg-white" />
                        </div>
                        <div className="flex justify-between">
                            <div className="size-8 md:size-10 rounded-full bg-white" />
                            <div className="w-[82%] bg-[#115] p-4">
                                1. Casablanca (1942)
                                <br /><br />2. The Godfather (1972)
                                <br /><br />3. Schindler's List (1993) 
                                <br /><br />4. The Dark Knight (2008) 
                                <br /><br />5. Interstellar (2014)  
                                <br /><br />6. The Matrix (1999)
                                <br /><br />7. Titanic (1997)
                                <br /><br />8. Pulp Fiction (1994) 
                                <br /><br />9. Inception (2010)
                                <br /><br />10. Parasite (2019) 
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[60%] font-extrabold text-center text-[10vw] md:text-[6vw] leading-none bg-gradient-to-r from-[#98f] to-white bg-clip-text text-transparent">
                        From Users,<br/>To Users.
                    </div>
                </div>
                <div className="md:mx-[4vw] my-[10vw] border-4 grid grid-cols-4 relative overflow-hidden">
                    {['Art', 'Business', 'Career', 'Culture', 'Education', 'Entertainment', 'Finance', 'Fitness', 'Food', 'Gaming', 'Health', 'Programming', 'Politics', 'Science', 'Sports', 'Technology'].map(
                        (i) => {
                            return <div className="topic xs:text-[0.6rem] sm:text-[0.8rem] md:text-[1.2rem]" key={i}>{i}</div>
                        }
                    )}
                    <div className="w-full h-full absolute flex justify-center items-center top-0 left-0">
                        <div className="absolute w-[60%] xs:h-12 sm:h-24 md:h-40 text-[6vw] xs:blur-lg sm:blur-xl md:blur-2xl bg-[#98f5]" />
                        <div className="absolute xs:text-[9vw] font-extrabold text-[#fff6]">COMPREHENSIVE</div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Index