export default function LogOut({
  kittyCityData,
  setKittyCityData,
  initialData,
  showLogOut,
  setShowLogOut,
  setShowSignIn,
}) {
  const logOut = () => {
    console.log(initialData);
    console.log(kittyCityData);
    localStorage.clear();
    setShowLogOut(false);
    setShowSignIn(true);
    setKittyCityData(initialData);
  };
  return (
    <>
      <div className="flex flex-col w-[120px] relative z-[4]">
        <div>Hi {kittyCityData.username}</div>
        <div
          className="hover:text-[#a855f7] cursor-pointer ease-in-out duration-200 text-xs mt-1"
          onClick={() => setShowLogOut(true)}
        >
          Log Out
        </div>
      </div>
      {showLogOut && (
        <div className=" border absolute top-0 flex justify-center 0 z-[4] w-full h-full  ">
          <div className=" h-[300px] mt-[20%] flex items-center justify-center">
            <div className="p-5 md:h-[200px] w-[80%] md:w-[50%] mx-auto  bg-white border rounded border-[5px] border-[#a855f7] ease-in-out">
              <p>
                Since this site is using local storage, which is saved on your
                browser logging out will erase all your saved kitties
              </p>
              <p>Are you sure you want to erase your data?</p>
              <div className="flex justify-around mt-4">
                <button
                  className="border border-2 border-[#a855f7] rounded px-5"
                  onClick={() => logOut()}
                >
                  Yes
                </button>
                <button
                  className="border border-2 border-[#a855f7] rounded px-5"
                  onClick={() => setShowLogOut(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
