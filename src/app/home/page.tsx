"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GrLogout } from 'react-icons/gr';
import { useRouter } from "next/navigation";
import { baseUrl } from '@/utils/baseUrl';

export default function Home(){
  const [questions, setQuestions] = useState([])
  const [user, setUser] = useState()
  const [curVisible, setCurVisible] = useState(false)
  const [cur, setCur] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/users/getdata`)
      res && setUser(res.data.data)
    }
    const getQuestions = async () => {
      const res = await axios.get(`${baseUrl}/questions/getquestions`)
      res && setQuestions(res.data.data)
    }
    getUser()
    getQuestions()
  }, [])

  const handleMouse = (e: any) => {
    setCur({ x: e.clientX, y: e.clientY })
    setCurVisible(true)
  }

  async function logout() {
    if (confirm("Are you sure? you're logging out.")) {
      const res = await axios.get("/api/users/logout")
      res.data.success && router.push('/')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center text-[14vw] leading-none font-extrabold'>
      <div className={`w-max h-max p-[2vw] border-4 md:border-8 lg:border-[20px] animate-[opac_4s] ${curVisible ? 'cursor-none' : 'cursor-default'} `}
        onMouseMove={handleMouse} onMouseOut={() => setCurVisible(false)}>STAY TUNED.
        {curVisible && <div className='absolute w-32 h-32 blur-3xl bg-[#98f] rounded-full' style={{ top: (cur.y) - 64, left: (cur.x) - 64 }} />}
      </div>
      <GrLogout className='absolute top-10 right-10 cursor-pointer' size={28} onClick={() => logout()} />
    </div>
  )
}
