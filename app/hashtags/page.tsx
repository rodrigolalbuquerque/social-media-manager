"use client";
import FormModal from "@/components/FormModal";
import { useState } from "react";

function Page() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prevModal) => (prevModal ? false : true));
  };

  return (
    <div className="relative h-screen">
      {modal && <FormModal />}
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

export default Page;
