"use client"
import axios from 'axios'
function page() {

const getdata = async() =>{
    const res = await axios.post("/api/users/getdata",)
    console.log(res)
}

getdata()

  return (
    <div>page</div>
  )
}

export default page