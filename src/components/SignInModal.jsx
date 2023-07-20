import { useState } from "react";

export default function SignInModal({
  kittyCityData,
  setKittyCityData,
  showSignIn,
  setShowSignIn,
}) {
  const [name, setName] = useState("");

  const saveName = (name) => {
    setKittyCityData((prevkittyCityData) => {
      // Find the object with the username key
      let username = prevkittyCityData.username;

      // If the object was found, update the username
      if (typeof username == "string" && username == "") {
        prevkittyCityData.username = name;
      }

      // Update the local storage
      localStorage.setItem("kittyCityData", JSON.stringify(prevkittyCityData));
      setShowSignIn(false);
      // Return the updated state
      return prevkittyCityData;
    });
  };

  return (
    <div className="border absolute top-0 z-10 w-full h-full flex items-center justify-center bg-gray-transparent">
      <div className="h-[300px] w-[300px] flex items-center justify-center rounded bg-white">
        <div className="flex flex-col h-full border">
          <p className="text-center">Welcome to Kitty City!</p>
          <p className="text-center">What's your name?</p>
          <form>
            <input
              className="border"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" onClick={() => saveName(name)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
