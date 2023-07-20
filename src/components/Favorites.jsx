import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Favorites({
  sliderIndex,
  setSliderIndex,
  favorites,
  selectedFavorite,
  setShowPreviewModal,
  setShowFavoritesModal,
}) {
  const slideRef = useRef(null);
  const hideArrow = sliderIndex > 0;

  const setPreviewModal = (favorite) => {
    console.log(favorite.id);
    selectedFavorite.current = favorite;
    setShowPreviewModal(true);
  };

  const slideLeft = () => {
    setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 0);
  };

  const slideRight = () => {
    setSliderIndex(
      sliderIndex < favorites.length - 5 ? sliderIndex + 1 : sliderIndex
    );
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${-sliderIndex * 113}px)`;
    }
  }, [sliderIndex]);

  return (
    <>
      {favorites && (
        <>
          <div className="flex items-center relative">
            <div className="w-[565px] overflow-hidden flex rounded-[50px] flex items-center">
              {hideArrow && (
                <button
                  className="z-10 absolute bg-white carousel-button border flex justify-center items-center rounded-full h-[30px] w-[30px]"
                  onClick={slideLeft}
                >
                  {"<"}
                </button>
              )}
              <ul
                className="carousel-slide mx-auto rounded-full"
                ref={slideRef}
              >
                {favorites.map((favorite, i) => (
                  <li
                    key={i}
                    className="p-[2px] rounded-full w-[105px] mx-[4px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  >
                    <Image
                      alt={`favorite Cat-${i}`}
                      width="100"
                      height="100"
                      src={favorite.url}
                      className="object-cover p-[4px] rounded-full h-[100px] w-[100px] cursor-pointer"
                      onClick={() => {
                        setPreviewModal(favorite);
                      }}
                    ></Image>
                  </li>
                ))}
              </ul>
              {favorites.length > 5 && favorites.length - 5 > sliderIndex && (
                <button
                  className="z-10 absolute right-0 bg-white carousel-button border flex justify-center items-center rounded-full h-[30px] w-[30px]"
                  onClick={slideRight}
                >
                  {">"}
                </button>
              )}
            </div>
          </div>
          <div className="p-5">
            <button onClick={() => setShowFavoritesModal(true)}>
              See all of your favorite kitties
            </button>
          </div>
        </>
      )}
    </>
  );
}
