"use client"
import { useUserStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';
import { topicsArray } from '@/utils/topicsArray'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Questions from '../components/Questions';

export default function Home() {

  const [question, setQuestion] = useState("")
  const [allQuestions, setAllQuestions] = useState([])
  const [topic, setTopic] = useState([] as string[])
  const [customTopic, setCustomTopic] = useState("")
  const [showTopics, setShowTopics] = useState(4)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, getUser } = useUserStore((state: any) => ({ user: state.user, getUser: state.getUser }))
  const username = user.username

  const addQuestion = async () => {
    topic.push(customTopic)
    const response = await axios.post(`${baseUrl}questions/addquestion`, { username, question, topic })
    setLoading(false)
    if (!response.data.success) {
      setError("Something went wrong.")
      setTimeout(() => setError(""), 3000)
    }
  }

  async function getAllQuestions() {
    setLoading(true)
    const res = await axios.get(`${baseUrl}questions/getquestions`)
    setLoading(false)
    if (res.data.message == "Questions found") {
      setAllQuestions(res.data.data)
    }
    else {
      setError("Something went wrong.")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleClick = async () => {
    setLoading(true)
    await addQuestion()
    setTopic([])
    getAllQuestions()
  }

  const handleTopicClick = (i: string) => {
    if (topic.indexOf(i) > -1)
      setTopic(topic.filter(item => item !== i))
    else
      setTopic(topic => [...topic, i])
  }

  useEffect(() => {
    getUser()
    getAllQuestions()
  }, [])

  return (
    <section className='relative min-h-screen bg-[#111]'>
      <Sidebar />
      <main className='md:ml-[25vw] lg:ml-[20vw]'>
        <div className='w-full flex flex-col gap-4 pt-10 md:pt-4 p-4'>
          <textarea rows={2} placeholder='ask or share'
            className='bg-black border p-2 w-full placeholder:text-sm'
            onChange={(e: any) => setQuestion(e.target.value)} />
          <div className='flex justify-between md:justify-start gap-8'>
            <div className="w-full text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 relative overflow-hidden">
              <label className='col-span-2 sm:col-span-3 md:col-span-4 pb-2 flex justify-between items-center'>Select topics
                {showTopics < topicsArray.length ?
                  <div className='text-xs flex items-center' onClick={() => setShowTopics(showTopics + 8)}>
                    more<GoTriangleDown className='text-lg' />
                  </div> :
                  <div className='text-xs flex items-center' onClick={() => setShowTopics(4)}>
                    less<GoTriangleUp className='text-lg' />
                  </div>}
              </label>
              {topicsArray.slice(0, showTopics).map(
                (i) => {
                  return <div className={`py-2 border text-center overflow-x-hidden break-words ${topic.indexOf(i) > -1 ? 'bg-[#53f]' : 'bg-transparent'}`}
                    key={i} onClick={() => handleTopicClick(i)}>{i}</div>
                }
              )}
              <div className='col-span-2 sm:col-span-3 md:col-span-4'>
                <input type="text" placeholder={topic.length > 0 ? 'You can add more related tags here.' : 'Looking for something else? type here.'} className='w-full p-2 border outline-none bg-transparent placeholder:text-[#fff8] placeholder:text-[0.6rem] md:placeholder:text-sm'
                  onChange={(e: any) => setCustomTopic(e.target.value)} />
              </div>
            </div>

            <button disabled={loading ? true : false} className='addButton hover:bg-[#75f] hover:border-white'
              onClick={handleClick}>Add</button>
          </div>
        </div>
        <div className='p-4 border-t-4 border-[#fff8] font-bold'>Latest</div>
        <Questions questions={allQuestions} loading={loading} error={error} />
      </main>
    </section>
  )
}
