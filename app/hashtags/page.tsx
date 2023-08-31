"use client";
import FormModal from "@/components/FormModal";
import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";

type BlocksProtocol = {
  content: string | null;
  hBlockName: string;
  id: number;
};

function Page() {
  const [modal, setModal] = useState(false);
  const [blocks, setBlocks] = useState<BlocksProtocol[] | null>(null);

  useEffect(() => {
    const getBlocks = async () => {
      const { data, error } = await supabase.from("hashtags_Block").select("*");
      setBlocks((prevBlock) => prevBlock ?? data);
      return data;
    };

    getBlocks();
  }, []);

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
        {blocks?.map((block) => (
          <div
            key={block.id}
            className="min-h-72 w-72 max-w-lg rounded-md border border-black bg-slate-50 drop-shadow-md lg:h-96"
          >
            <h2 className="mb-7 p-5 text-3xl">{block.hBlockName}</h2>
            <p className="p-5 text-lg">{block.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
