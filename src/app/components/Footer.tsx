import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="p-10 bg-black text-right space-y-4 mix-blend-lighten border-t border-f8">
      <div>Join the conversation</div>
      <div className="w-full flex items-center justify-end gap-4">
        <Link href={"https://instagram.com/atharv_mahabal"}>
          <FaInstagram
            size={28}
            className="hover:bg-[#f03] duration-500 rounded-md p-1"
          />
        </Link>
        <Link href={"https://github.com/atharv23sm"}>
          <FaGithub
            size={28}
            className="hover:bg-[#116] duration-500 rounded-md p-1"
          />
        </Link>
        <Link href={""}>
          <FaLinkedin
            size={28}
            className="hover:bg-[#33f] duration-500 rounded-md p-1"
          />
        </Link>
      </div>
      <div className="text-xs text-[#fff6]">
        App in beta version. Stay tuned for updates!
        <br />
        Built by Atharv Mahabal
      </div>
    </div>
  );
}
