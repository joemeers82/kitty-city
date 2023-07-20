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
      <div className="flex border border-2 ">
        <div>Hi {kittyCityData.username}</div>
        <div onClick={() => setShowLogOut(true)}>Log Out</div>
      </div>
      {showLogOut && (
        <div className=" border absolute top-0 flex justify-center 0 z-[9999999] w-full h-full  bg-gray-transparent ">
          <div className=" h-[200px] mt-[30%] flex items-center justify-center">
            <div className="p-5 w-[50%] mx-auto  bg-white ">
              <p>
                Since this site is using local storage saved on your browser
                logging Out will erase all your saved kitties
              </p>
              <p>Are you sure?</p>
              <button onClick={() => logOut()}>Yes</button>
              <button onClick={() => setShowLogOut(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
