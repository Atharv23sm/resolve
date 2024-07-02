"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/baseUrl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import ButtonLoading from "../components/Loaders/ButtonLoading";
import Error from "../components/Errors/Error";

export default function LoginPage() {
  const [loginData, setloginData] = useState({ email: "", password: "" })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [error, setError] = useState("")
  const router = useRouter()

  const togglePasswordVisibility = () => passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')

  const onSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${baseUrl}users/login`, loginData)
      if (response.data.success) {
        router.push("/home")
      }
      else {
        setError(response.data.error)
        setLoading(false)
      }
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  };

  useEffect(() => {
    (loginData.email.length > 0 && loginData.password.length > 0)
      ? setButtonDisabled(false) : setButtonDisabled(true)
  }, [loginData])

  return (
    <div className="min-h-screen bg-black flex justify-center md:items-center p-[20vh_6vw]">
      <div className="h-max flex flex-col md:flex-row justify-center md:items-center gap-[6vw] md:gap-[8vw] lg:border-8 lg:p-10">
        <div className="text-[3rem] md:text-[4rem] leading-[3rem] md:leading-[4rem] font-extrabold bg-gradient-to-r from-white to-[#98f] bg-clip-text text-transparent">
          <div>WELCOME.</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="w-[250px] text-left font-bold text-xl">Login</div>
          {error && <Error error={error} />}
          <input type="email" onChange={(e) => { setError(""); setloginData({ ...loginData, email: e.target.value }) }} placeholder="email" required className="auth-input" />
          <div className="w-max h-max flex items-center relative">
            <input type={passwordType} onChange={(e) => { setError(""); setloginData({ ...loginData, password: e.target.value }) }} placeholder="password" required maxLength={16} className="auth-input" />
            {passwordType === 'password' ? <FaEye className="absolute right-2" onClick={togglePasswordVisibility} /> : <FaEyeSlash className="absolute right-2" onClick={togglePasswordVisibility} />}
          </div>
          <button type="submit" disabled={buttonDisabled && true} className={`w-[250px] p-2 ${!loading && 'bg-[#53f] hover:bg-[#75f]'} flex justify-center`} >
            <div className={`${buttonDisabled && 'text-[#fff8]'} flex justify-center`}>{loading ? <ButtonLoading /> : 'Login'}</div>
          </button>
          <div>New user? <Link href="/signup" className="text-[#75f] font-bold underline">Sign up</Link> now.</div>
        </form>
      </div>
    </div>
  )

}
