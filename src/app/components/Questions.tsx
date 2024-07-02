import { useRouter } from "next/navigation"
import ButtonLoading from "./Loaders/ButtonLoading"
import Error from "./Errors/Error"

export default function Questions({ questions, loading, error }: any) {

    const router = useRouter()

    return (
        <>
            {error && <Error error={error} />}
            <div className={`${!loading ? 'p-0' : 'p-20'} border-t-2 border-[#fff1]`}>
                {!loading ?
                    questions.length < 1 ?
                        <div className='text-center pt-10 md:pt-4 p-4'>No results.</div> :
                        questions.map((q: any) => {
                            return (
                                <div key={q?._id} className='p-[32px_16px] space-y-4 border-b-2 border-[#fff1] cursor-pointer'
                                    onClick={() => router.push(`/home/question/${q?._id}`)}>
                                    <div className='text-xs flex justify-between'>
                                        <div>{q?.username}
                                            <span className='text-[#fffa]'> is asking,</span>
                                        </div>
                                        <div>{new Date(q?.date).toLocaleDateString() + " - " + new Date(q?.date).toLocaleTimeString()}</div>
                                    </div>
                                    <div className='text-lg font-bold whitespace-pre-line'>{q?.question}</div>
                                    <div className="text-xs text-[#fff8] flex flex-wrap gap-1">
                                        {q?.topic.map((t:string)=>
                                        {return <div key={t}>{t}</div>})}
                                    </div>
                                </div>
                            )
                        }) : <ButtonLoading />}
            </div>
        </>
    )
}
