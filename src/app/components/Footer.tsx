import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <div className="w-full p-10 bg-black border-t space-y-4">
        <div className="text-center">Join the conversation</div>
        <div className="w-full flex justify-center items-center gap-4">
            <FaInstagram size={20}/>
            <FaGithub size={20}/>
            <FaLinkedin size={20}/>
        </div>
        <div className="text-center text-xs text-[#fff6]">Build by Atharv Mahabal</div>
    </div>
  )
}
