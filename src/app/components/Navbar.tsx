"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";

export default function Navbar() {
  const [profileVisible, setProfileVisible] = useState(false);
  const router = useRouter();

  return (
    <div className="p-[16px_22px] bg-gradient-to-l from-[black_50%] to-5 flex justify-between items-center border-b">
      <div
        className="w-max p-1 leading-none border-4 text-xl font-bold cursor-pointer"
        onClick={() => router.push("/home")}
      >
        Resolve
      </div>
      <CgProfile
        className="cursor-pointer"
        size={28}
        onMouseEnter={() => setProfileVisible(true)}
        onClick={() => setProfileVisible(!profileVisible)}
      />
      {profileVisible && (
        <Profile
          profileVisible={profileVisible}
          setProfileVisible={setProfileVisible}
        />
      )}
    </div>
  );
}
