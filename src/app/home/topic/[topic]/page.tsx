"use client"
import { useEffect, useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';
import axios from 'axios';
import Questions from '@/app/components/Questions';

export default function Topic({ params, }: { params: { topic: string } }) {

  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function getFilteredQuestions() {
    setLoading(true)
    const filterTopic = params.topic.replace('%20', " ")
    const res = await axios.post(`${baseUrl}questions/filterbytopic`, { filterTopic })
    setLoading(false)
    if (res.data.message == "Filtered questions found") {
      setFilteredQuestions(res.data.data)
    }
    else {
      setError("Something went wrong.")
      setTimeout(() => setError(""), 3000)
    }
  }

  useEffect(() => {
    getFilteredQuestions()
  }, [])

  return (
    <div className='md:ml-[25vw] lg:ml-[20vw]'>
      <Questions questions={filteredQuestions} loading={loading} error={error} />
    </div>
  )
}
