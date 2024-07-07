import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

function Attachments({ att }: any) {
  const router = useRouter();
  return (
    att.length > 0 && (
      <div className="max-w-[96vw] md:max-w-[70vw] lg:max-w-[78vw] flex flex-wrap justify-between gap-4">
        {att.map((i: string) => {
          return (
            <CldImage
              width={0}
              height={0}
              sizes="100vw"
              loading="lazy"
              className="w-full sm:size-[44vw] md:size-[33vw] lg:size-[24vw] object-cover border-2 border-f4"
              src={i}
              key={i}
              alt="Oops! Colud not load image."
              onClick={() =>
                router.push(
                  `https://res.cloudinary.com/dcdawcjyo/image/upload/v1720357175/${i}.png`
                )
              }
            />
          );
        })}
      </div>
    )
  );
}

export default Attachments;
