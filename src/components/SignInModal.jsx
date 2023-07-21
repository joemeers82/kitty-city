import { useState } from "react";

export default function SignInModal({
  kittyCityData,
  setKittyCityData,
  showSignIn,
  setShowSignIn,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const saveName = (event) => {
    event.preventDefault(); // Prevent form submission
    if (name.trim() === "") {
      setError("Please enter your name");
    } else {
      setError(""); // clear error if any exists
      setKittyCityData((prevkittyCityData) => {
        let username = prevkittyCityData.username;

        if (typeof username == "string" && username == "") {
          prevkittyCityData.username = name;
        }

        localStorage.setItem(
          "kittyCityData",
          JSON.stringify(prevkittyCityData)
        );
        setShowSignIn(false);
        return prevkittyCityData;
      });
    }
  };

  return (
    <div className="absolute top-0 z-[4] w-full h-full flex items-center justify-center  mt-[400px] ">
      <div className="h-[300px] w-[300px] flex items-center justify-center rounded bg-white  rounded border-[5px] border-[#a855f7] ">
        <div className="flex flex-col h-full justify-center">
          <p className="text-center text-2xl">Welcome to Kitty City!</p>
          <div className="mt-[30px] text-center">
            <p className="text-center">{`What's your name?`}</p>
            <form>
              <input
                className="border"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
              <p>
                <button
                  className="border border-2 border-[#a855f7] rounded px-5 mt-5"
                  type="submit"
                  onClick={saveName}
                >
                  Submit
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
