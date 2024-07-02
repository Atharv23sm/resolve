"use client"
import { useEffect, useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from "react-icons/bs";
import ButtonLoading from '@/app/components/Loaders/ButtonLoading';
import Error from '@/app/components/Errors/Error';
import axios from 'axios';

export default function Question({ params, }: { params: { username: any } }) {

  const [myAnswers, setMyAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  // const [showMore, setShowMore] = useState(0)
  const router = useRouter()

  async function getMyAnswers() {
    const username = params.username
    const res = await axios.post(`${baseUrl}questions/answerbyuser`, { username })
    setLoading(false)
    if (res.data.message == "My Answers found") {
      setMyAnswers(res.data.data)
    }
    else {
      setError("Something went wrong.")
      setTimeout(() => setError(""), 3000)
    }
  }

  useEffect(() => {
    setLoading(true)
    getMyAnswers()
  }, [])

  return (
    <div className={`md:ml-[25vw] lg:ml-[20vw]`}>
      <div className={`pt-10 md:pt-4 p-4 border-b border-[#fff2]`}>My Answers</div>
      {error && <Error error={error} />}
      {!loading ?
        <div className='border-b border-[#fff2]'>
          {myAnswers.map((a: any) => {
            return (
              <div key={a?._id} className='space-y-4 p-4 border-t border-[#fff2] relative overflow-hidden cursor-pointer'
                onClick={() => router.push(`/home/question/${a?.questionId}`)}>
                <div className='text-xs flex justify-between'>
                  <div>Answering to,</div>
                  <div>{new Date(a?.date).toLocaleDateString() + " - " + new Date(a?.date).toLocaleTimeString()}</div>
                </div>
                <div className='font-bold'>{a?.question}</div>
                <div className='whitespace-pre-line'>{a?.answer}</div>
                {/* <div className='absolute right-2 bottom-2'>
                  <BsThreeDotsVertical className="cursor-pointer"/> onClick={()=>setShowMore(a?._id)}
                </div>
                <div className={`bg-black text-sm p-[8px_16px] space-y-4 absolute bottom-2 right-6`}> opacity-0 ${showMore === a?._id && 'opacity-100'}`  onMouseLeave={()=>setShowMore(0)}
                  <div className='cursor-pointer' >View Question</div>
                  <div className='text-[#f00]'>Delete</div>
                </div> */}
              </div>
            )
          })}
        </div>
        : <ButtonLoading />}
    </div>
  )
}
