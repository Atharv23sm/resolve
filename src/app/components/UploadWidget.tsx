"use client";
import { CldUploadWidget } from "next-cloudinary";
import { GrAttachment } from "react-icons/gr";

export default function UploadWidget({
  imagePublicIds,
}: {
  imagePublicIds: string[];
}) {
  return (
    <CldUploadWidget
      uploadPreset="resolve-by-atharv"
      onSuccess={(results: any) => {
        imagePublicIds.push(results.info.public_id);
      }}
    >
      {({ open }) => {
        return (
          <button
            onClick={() => open()}
            className="p-2 rounded-full bg-5 relative"
          >
            <GrAttachment />
            {imagePublicIds.length > 0 && (
              <div className="absolute size-5 rounded-full bg-[#f00] top-0 -right-2 text-sm">
                {imagePublicIds.length}
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
