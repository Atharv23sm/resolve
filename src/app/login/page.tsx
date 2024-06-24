"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonLoading from "../components/ButtonLoading";
import Link from "next/link";

export default function loginPage() {
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

    const response = await axios.post("/api/users/login", loginData)
    if (response.data.success) {
      router.push("/home")
    }
    else {
      setError(response.data.error)
      setLoading(false)
    }
    // console.log(response.data)
  };

  useEffect(() => {
    (loginData.email.length > 0 && loginData.password.length > 0)
      ? setButtonDisabled(false) : setButtonDisabled(true)
  }, [loginData])

  return (
    <div className="w-full min-h-screen bg-black flex justify-center md:items-center xs:py-[20vh] px-[6vw]">
      <div className="h-max flex flex-col md:flex-row justify-center gap-[6vw] md:gap-[8vw] lg:border-8 lg:p-10">
        <div className="xs:text-[3rem] sm:text-[3.5rem] md:text-[4rem] xs:leading-[3rem] sm:leading-[3.5rem] md:leading-[4rem] flex flex-col justify-center font-extrabold bg-gradient-to-r from-white to-[#98f] bg-clip-text text-transparent">
          <div>WECLOME</div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col items-center md:items-start gap-4">
          <div className="w-[250px] text-left font-bold text-xl">Login</div>
          {error && <div className="text-[#f22]">{error}</div>}
          <input type="email" onChange={(e) => { setError(""); setloginData({ ...loginData, email: e.target.value }) }} placeholder="email" required className="auth-input" />
          <div className="w-max h-max flex items-center relative">
            <input type={passwordType} onChange={(e) => { setError(""); setloginData({ ...loginData, password: e.target.value })}} placeholder="password" required maxLength={16} className="auth-input" />
            {passwordType === 'password' ? <FaEye className="absolute right-2" onClick={togglePasswordVisibility} /> : <FaEyeSlash className="absolute right-2" onClick={togglePasswordVisibility} />}
          </div>
          <button type="submit" disabled={buttonDisabled && true} className={`w-[250px] p-2 ${!loading && 'bg-[#53f]'} flex justify-center`} >
            <div className={`${buttonDisabled && 'text-[#fff8]'} flex justify-center`}>{loading ? <ButtonLoading /> : 'Login'}</div>
          </button>
          <div>New user? <Link href="/signup" className="text-[#75f] font-bold underline">Sign up</Link> now.</div>
        </form>
      </div>
    </div>
  )

}
