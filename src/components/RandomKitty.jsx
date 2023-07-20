import Image from "next/image";
import heart from "../../public/heartcat.svg";

export default function RandomKitty({ cat, fetchNewCat, saveCatToFavorites }) {
  return (
    <div className="my-10 w-full mx-auto">
      {cat.url && (
        <>
          <div className="relative h-full w-full">
            <div className="border p-3 h-[500px] w-[90%] md:w-[500px] mx-auto relative bg-black">
              <Image
                alt="Pretty Cat Image"
                src={cat.url}
                fill
                className="object-contain"
              ></Image>
            </div>
            <div className="flex justify-between py-3 w-[90%] md:w-[500px] mx-auto">
              <div
                className=" right-5 top-5 cursor-pointer z-10"
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
                ></Image>
              </div>
              <button
                className=" bottom-5 right-5 z-10 rounded-full border px-3 text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                onClick={fetchNewCat}
              >
                {"Random Kitty"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
