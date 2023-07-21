import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function PreviewModal({
  selectedFavoritePic,
  setShowPreviewModal,
}) {
  const handleBackgroundClick = () => {
    setShowPreviewModal(false);
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className=" border absolute top-0 z-10 w-full h-full flex flex-col items-center  bg-gray-transparent "
      onClick={handleBackgroundClick}
    >
      <div className="h-full mx-auto w-[90%] md:w-full absolute flex items-center justify-center">
        <div className="relative h-[500px] w-[500px]">
          <Image
            src={selectedFavoritePic.current.url}
            alt="preview favorite image"
            className="object-cover"
            fill
          ></Image>
        </div>
      </div>
    </div>
  );
}
