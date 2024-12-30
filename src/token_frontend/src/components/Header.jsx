import React from "react";

function Header() {
  return (
    <header className="bg-zinc-900 w-[600px] rounded-xl p-8 mt-8 shadow-2xl shadow-indigo-700/20">
      <div className="flex justify-center items-center" id="logo">
        <div>
          <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
            XFF
          </span>
          <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
            XFF
          </h1>
        </div>
        <h1 className="text-5xl ml-4 font-bold">Exchange</h1>
      </div>
    </header>
  );
}

export default Header;
