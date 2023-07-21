import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import heart from "../../public/heartcat.svg";

export default function RandomKitty({ cat, fetchNewCat, saveCatToFavorites }) {
  const [prevCat, setPrevCat] = useState(null);
  const currentImageRef = useRef(null);
  const prevImageRef = useRef(null);

  useEffect(() => {
    if (prevCat) {
      gsap.to(prevImageRef.current, { opacity: 0, duration: 1.2 });
    }
    gsap.to(currentImageRef.current, { opacity: 1, duration: 1, delay: 1.2 });
  }, [cat]);

  const onNewCat = () => {
    setPrevCat(cat);
    gsap.to(currentImageRef.current, { opacity: 0, duration: 1.2 });
    fetchNewCat();
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative h-full w-full">
        <div className="border p-3 h-[500px] w-[90%] md:w-[500px] mx-auto relative bg-black overflow-hidden">
          {prevCat?.url && (
            <div
              ref={prevImageRef}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundSize: "contain",
                backgroundImage: `url(${prevCat.url})`,
                opacity: 1,
              }}
            />
          )}
          {cat.url && (
            <div ref={currentImageRef} style={{ opacity: 0 }}>
              <Image
                alt="Pretty Cat Image"
                src={cat.url}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between py-3 w-[90%] md:w-[500px] mx-auto">
          <div
            className="right-5 top-5 cursor-pointer z-[5]"
            onClick={() => {
              saveCatToFavorites(cat);
            }}
          >
            <Image
              src={heart}
              height={50}
              width={50}
              alt="heart"
              title="Like Image"
            />
          </div>
          <button
            className="bottom-5 right-5 z-[5] rounded-full border px-3 text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            onClick={onNewCat}
          >
            {"Random Kitty"}
          </button>
        </div>
      </div>
    </div>
  );
}
