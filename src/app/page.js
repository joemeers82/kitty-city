"use client";
import { useState, useEffect, useRef } from "react";

import Image from "next/image";
import LogOut from "@/components/LogOut";
import Favorites from "@/components/Favorites";
import RandomKitty from "@/components/RandomKitty";
import SignInModal from "@/components/SignInModal";
import PreviewModal from "@/components/PreviewModal";
import AllFavoritesModal from "@/components/AllFavoritesModal";
import { Spinner } from "@/components/Spinner";

export default function Home() {
  let initialData = { username: "", favorites: [] }; // Initialize Local Storage with array of two objects for username and kitty favorites
  const [sliderIndex, setSliderIndex] = useState(0);
  const [kittyCityData, setKittyCityData] = useState(initialData); //Local Storage
  const [cat, setCat] = useState([]); // Random Cat
  const [showSignIn, setShowSignIn] = useState(true); // Show "Sign In"
  const [showLogOut, setShowLogOut] = useState(false); // Show "Log Out"
  const [showPreviewModal, setShowPreviewModal] = useState(false); // Show Image Preview Modal
  const [isLoading, setIsLoading] = useState(true); // Show Spinner
  const [showFavoritesModal, setShowFavoritesModal] = useState(false); // Show users Favorite Kitties Modal
  const selectedFavorite = useRef(null); // Image from Favorites Slider to be shown in Preview Modal
  const [kittyFact, setKittyFact] = useState(""); //random kitty fact

  async function fetchCat() {
    const randomCat = await fetch(`${process.env.NEXT_PUBLIC_CAT_API_URL}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CAT_API,
      },
    });
    const randomFact = await fetch(`${process.env.NEXT_PUBLIC_CAT_FACT_URL}`);

    const cat = await randomCat.json();
    const fact = await randomFact.json();

    setKittyFact(fact.fact);
    setCat(cat[0]);
  }

  useEffect(() => {
    let kittyCityData = localStorage.getItem("kittyCityData");
    let storedData;

    if (kittyCityData) {
      kittyCityData = JSON.parse(kittyCityData);
      if (kittyCityData.username) {
        setShowSignIn(false);
      }
      try {
        storedData = kittyCityData;
        console.log(storedData);

        if (Object.keys(storedData).length < 2) {
          storedData = initialData;
        }
      } catch (error) {
        console.error("Error parsing stored kittyCityData:", error);
        storedData = initialData;
      }
    } else {
      storedData = initialData;
    }

    setKittyCityData(storedData);
    fetchCat();
    setIsLoading(false); // Data is fetched, set loading to false
  }, []);

  const fetchNewCat = () => {
    fetchCat();
  };

  const saveCatToFavorites = (cat) => {
    setKittyCityData((prevkittyCityData) => {
      // If the object was found and the current cat is not already a favorite
      if (!prevkittyCityData.favorites.some((favCat) => favCat.id === cat.id)) {
        prevkittyCityData.favorites.push(cat);
      }
      // Update the local storage
      localStorage.setItem("kittyCityData", JSON.stringify(prevkittyCityData));

      if (prevkittyCityData.favorites.length >= 5) {
        setSliderIndex(prevkittyCityData.favorites.length - 5);
      }

      // Return the updated state
      return { ...prevkittyCityData };
    });
  };

  return (
    <>
      <div className="flex align-center justify-end text-center py-5 w-full relative ">
        <h1 className="w-full absolute text-5xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Kitty City
        </h1>
        {kittyCityData.username && (
          <LogOut
            kittyCityData={kittyCityData}
            setKittyCityData={setKittyCityData}
            initialData={initialData}
            showLogOut={showLogOut}
            setShowLogOut={setShowLogOut}
            setShowSignIn={setShowSignIn}
          ></LogOut>
        )}
      </div>

      <main className="flex  flex-col items-center  mx-auto">
        {/* <Spinner isLoading={isLoading}></Spinner> */}
        {!showSignIn && (
          <>
            <Favorites
              sliderIndex={sliderIndex}
              setSliderIndex={setSliderIndex}
              favorites={kittyCityData.favorites}
              selectedFavorite={selectedFavorite}
              changeCat={setCat}
              setShowPreviewModal={setShowPreviewModal}
              setShowFavoritesModal={setShowFavoritesModal}
            ></Favorites>

            <div className="min-h-[100px] flex items-center justify-center p-4 w-[90%] mx-auto text-center">
              {kittyFact}
            </div>
            <RandomKitty
              cat={cat}
              fetchNewCat={fetchNewCat}
              saveCatToFavorites={saveCatToFavorites}
            ></RandomKitty>
          </>
        )}
      </main>

      {showSignIn && (
        <SignInModal
          kittyCityData={kittyCityData}
          setKittyCityData={setKittyCityData}
          showSignIn={showSignIn}
          setShowSignIn={setShowSignIn}
        ></SignInModal>
      )}

      {showPreviewModal && (
        <PreviewModal
          selectedFavoritePic={selectedFavorite}
          setShowPreviewModal={setShowPreviewModal}
        ></PreviewModal>
      )}

      {showFavoritesModal && (
        <AllFavoritesModal
          username={kittyCityData.username}
          setShowFavoritesModal={setShowFavoritesModal}
          favorites={kittyCityData.favorites}
        ></AllFavoritesModal>
      )}
    </>
  );
}
