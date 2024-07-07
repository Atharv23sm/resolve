import Link from "next/link";
import Image from "next/image";
import { GrHome } from "react-icons/gr";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Image
        src={"/img/404.png"}
        height={300}
        width={300}
        alt={"Not Found"}
        className="invert"
      />
      <p>Apologies, could not locate the page.</p>
      <Link href="/" className="p-1 rounded-md bg-5">
        <GrHome size={32} />
      </Link>
    </div>
  );
}
