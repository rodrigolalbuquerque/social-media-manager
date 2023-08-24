"use client"
import { useState } from "react";

function page() {
  const [modal, setModa] = useState(false);

  const toggleModal = () => {
    setModa(prevModal => prevModal ? false : true);
  };

  return (
    <div className="h-screen relative bg-slate-400">
      <div className={`${!modal && 'hidden'} absolute left-0 right-0 top-40 mx-auto h-60 w-60 bg-red-600`}></div>
      <div className="">
      <button onClick={toggleModal}>Open Modal</button>
    </div>
    </div>
  )
}

export default page