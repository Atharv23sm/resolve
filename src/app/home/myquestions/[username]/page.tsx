"use client"
import { useEffect, useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';
import axios from 'axios';
import Questions from '@/app/components/Questions';

export default function Topic({ params, }: { params: { username: string } }) {

  const [myQuestions, setMyQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function getMyQuestions() {
    setLoading(true)
    const username = params.username
    const res = await axios.post(`${baseUrl}questions/filterbyuser`, { username })
    setLoading(false)
    if (res.data.message == "My questions found") {
      setMyQuestions(res.data.data)
    }
    else {
      setError("Something went wrong.")
      setTimeout(() => setError(""), 3000)
    }
  }

  useEffect(() => {
    getMyQuestions()
  }, [getMyQuestions])

  return (
    <div className='md:ml-[25vw] lg:ml-[20vw]'>
      <div className='p-4 font-bold'>My Questions</div>
      <Questions questions={myQuestions} loading={loading} error={error} />
    </div>
  )
}
