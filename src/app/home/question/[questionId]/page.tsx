"use client"
import { useEffect, useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { baseUrl } from '@/utils/baseUrl';
import { useUserStore } from '@/store/user';
import ButtonLoading from '@/app/components/Loaders/ButtonLoading';
import Error from '@/app/components/Errors/Error';
import axios from 'axios';

export default function Question({ params, }: { params: { questionId: any } }) {

    const [answer, setAnswer] = useState("")
    const [allAnswers, setAllAnswers] = useState([])
    const [showReplies, setShowReplies] = useState(4)
    const [question, setQuestion] = useState({ username: "", question: "", topic: [], date: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { user, getUser } = useUserStore((state: any) => ({
        user: state.user,
        getUser: state.getUser,
    }))

    async function getQuestion(qId: any) {
        setLoading(true)
        const res = await axios.post(`${baseUrl}questions/getquestion`, { qId })
        setLoading(false)
        if (res.data.message == "Question found") {
            setQuestion(res.data.data)
        }
        else {
            setError("Something went wrong.")
            setTimeout(() => setError(""), 3000)
        }
    }

    async function getAllAnswers(qId: any) {
        setLoading(true)
        const res = await axios.post(`${baseUrl}questions/getanswers`, { qId })
        setLoading(false)
        if (res.data.message == "Answers found") {
            setAllAnswers(res.data.data)
        }
        else {
            setError("Something went wrong.")
            setTimeout(() => setError(""), 3000)
        }
    }

    const addAnswer = async () => {
        setLoading(true)
        const response = await axios.post(`${baseUrl}questions/addanswer`, { username: user.username, questionId: params.questionId, question: question.question, answer })
        setLoading(false)
        if (!response.data.success) {
            setError("Something went wrong.")
            setTimeout(() => setError(""), 3000)
        }
    }

    const handleClick = async () => {
        setLoading(true)
        await addAnswer();
        getAllAnswers(params.questionId)
    }

    useEffect(() => {
        getQuestion(params.questionId)
        getUser()
        getAllAnswers(params.questionId)
    }, [params.questionId])

    const allAnsLen = allAnswers.length

    return (
        <div className={`md:ml-[25vw] lg:ml-[20vw] ${loading && 'pt-10'}`}>
            {error && <Error error={error} />}
            {!loading ? <>
                <div className={`pt-10 md:pt-4 p-4 space-y-4`}>
                    <div className='text-xs flex justify-between'>
                        <div>{question?.username}
                            <span className='text-[#fffa]'> is asking,</span>
                        </div>
                        <div>{new Date(question?.date).toLocaleDateString() + " - " + new Date(question?.date).toLocaleTimeString()}</div>
                    </div>
                    <div className='text-lg font-bold whitespace-pre-line'>{question?.question}</div>
                    <div className="text-xs text-[#fff8] flex flex-wrap gap-1">
                        {question?.topic.map((t: string) => { return <div key={t}>{t}</div> })}
                    </div>
                </div>

                <div className='flex gap-4 p-4 border-y border-[#fff8]'>
                    <textarea rows={4} placeholder='share you answer' className='bg-black border p-2 w-[100%] placeholder:text-sm'
                        onChange={(e: any) => setAnswer(e.target.value)} />
                    <button className='addButton hover:bg-[#75f]'
                        onClick={handleClick}>
                        Add
                    </button>
                </div>
                <div className='p-4 flex gap-2 items-center'>
                    {(showReplies >= allAnsLen ? allAnsLen : showReplies) + " / " + allAnsLen} replies
                    {showReplies < allAnsLen ?
                        <GoTriangleDown className='cursor-pointer' onClick={() => setShowReplies(showReplies + 4)} />
                        : <GoTriangleUp className='cursor-pointer' onClick={() => setShowReplies(4)} />}
                </div>
                <div>
                    {allAnswers.slice(0, showReplies).map((a: any) => {
                        return (
                            <div key={a?.questionId} className='space-y-4 p-4 border-t border-[#fff8]'>
                                <div className='text-xs flex justify-between'>
                                    <div>{a?.username}
                                        <span className='text-[#fff8]'> answered,</span>
                                    </div>
                                    <div>{new Date(a?.date).toLocaleDateString() + " - " + new Date(a?.date).toLocaleTimeString()}</div>
                                </div>
                                <div className='whitespace-pre-line'>{a?.answer}</div>
                            </div>
                        )
                    })}
                </div>
            </> : <ButtonLoading />}
        </div>
    )
}
