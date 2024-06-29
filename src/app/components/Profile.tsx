import { GrLogout } from 'react-icons/gr';
import { baseUrl } from '@/utils/baseUrl';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import Link from 'next/link';
import ButtonLoading from './Loaders/ButtonLoading';

export default function Profile({profileVisible, setProfileVisible}:any) {

  const router = useRouter()

  const { user, getUser, clearUser } = useUserStore((state: any) => ({
    user: state.user,
    getUser: state.getUser,
    clearUser: state.clearUser
  }))

  useEffect(() => {
    getUser()
  }, [])

  async function logout() {
    if (confirm("Are you sure? you're logging out.")) {
      const res = await fetch(`${baseUrl}users/logout`)
      const resdata = await res.json()
      if (resdata.success) {
        clearUser()
        router.push("/")
      }
    }
  }

  return (
    <div className={`${profileVisible && 'opacity-100'} opacity-0 absolute z-10 xs:w-full sm:w-[16rem] right-0 top-[84px] bg-black border-y-4 sm:border-l-4 border-[#fff8] duration-300`}
    onMouseLeave={()=>setProfileVisible(false)}>
      <div className=' p-4 space-y-4 text-center w-full border-b border-[#fff8]'>
        {user?.username ? <>
          <div className='font-bold text-2xl'>{user?.username}</div>
          <div className='text-[#fffa] text-sm'>{user?.email}</div>
        </>
          : <ButtonLoading />}
      </div>

      <div className=' p-4 flex flex-col gap-4 w-full border-b border-[#fff8]'>
        <Link href={`/home/myquestions/${user?.username}`} className='hover:underline'>My Questions</Link>
        <Link href={`/home/myanswers/${user?.username}`} className='hover:underline'>My Answers</Link>
      </div>

      <div className='p-4 flex items-center gap-2 text-center hover:underline w-full border-b border-[#fff8]'>
        Logout <GrLogout className='top-10 right-10 cursor-pointer' onClick={() => logout()} />
      </div>
    </div>
  )
}
