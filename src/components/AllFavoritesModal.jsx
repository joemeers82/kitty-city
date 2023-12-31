/* This Component is for displaying the users favorites */
import Image from "next/image";
import { useState, useRef } from "react";

export default function AllFavoritesModal({
  setShowFavoritesModal,
  favorites,
  username,
}) {
  const close = () => {
    setShowFavoritesModal(false);
  };
  return (
    <>
      <div className="h-full w-full absolute bg-white z-[6] top-[100px]">
        <div
          className="flex justify-between px-5
        "
        >
          <h2> {`${username}'s`} top picks</h2>
          <span
            className="hover:text-[#a855f7] cursor-pointer ease-in-out duration-200 mt-1"
            onClick={() => close()}
          >
            Go Back
          </span>
        </div>
        <div className="h-full w-full grid grid-cols-4 max-w-screen-lg	gap-4 mx-auto grid-auto-rows-1fr grid-auto-columns-1fr">
          {favorites.map((pic, i) => {
            //   const isActive = pic.id === selectedFavoritePic.current.id;
            return (
              <div className="flex border relative" key={i}>
                <Image
                  className="object-contain cursor-pointer bg-white"
                  key={pic.id}
                  alt={`pic-${i}`}
                  fill
                  src={pic.url}
                  onClick={(e) => {
                    previewModalPicreviewPic(pic);
                    e.stopPropagation();
                  }}
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
