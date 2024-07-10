import React from "react";

export default function Skeleton() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((i: number) => {
    return (
      <div
        key={i}
        className={`w-full px-4 py-8 space-y-6 border-b-2 border-[#fff1] animate-pulse relative`}
      >
        <div className="w-full h-2 bg-f2" />
        <div className="w-full h-8 bg-f2" />
        <div className="w-full h-2 bg-f2" />
      </div>
    );
  });
}
