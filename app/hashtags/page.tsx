"use client";
import { useState } from "react";

function page() {
  const [modal, setModa] = useState(false);

  const toggleModal = () => {
    setModa((prevModal) => (prevModal ? false : true));
  };

  return (
    <div className="relative h-screen">
      <div
        className={`${
          !modal && "hidden"
        } absolute left-0 right-0 top-40 z-10 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md`}
      >
        <form
          method="POST"
          className="form my-5 flex flex-col items-center justify-center gap-12"
        >
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="block-name" className="mb-2 text-xl">
              Nome do Bloco
            </label>
            <input
              required
              type="text"
              id="block-name"
              className="name w-60 rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
            />
          </div>
          <div className="hBlock flex flex-col items-center justify-center">
            <label htmlFor="block" className="mb-2 text-xl">
              Hashtags
            </label>
            <textarea
              required
              id="block"
              className="h-36 w-60 resize-none rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
            />
          </div>
          <button
            type="submit"
            className="w-20 rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
          >
            Criar
          </button>
        </form>
      </div>
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="my-20 mr-20 rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
        >
          &#10133; Novo bloco
        </button>
      </div>
      <div className="flex justify-center gap-10">
        <div className="min-h-72 w-72 max-w-lg rounded-md border border-black bg-slate-50 drop-shadow-md lg:h-96">
          <h2 className="mb-7 p-5 text-3xl">Casamento</h2>
          <p className="p-5 text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nam
            hic corrupti qui temporibus cumque nostrum quidem, placeat
            laudantium ducimus voluptatum magni quo deserunt repellendus porro
            ipsa vel nisi vero?
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
