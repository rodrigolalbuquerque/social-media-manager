"use client";
import { BlockProtocol } from "@/app/hashtags/page";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

interface UpdaterFormProtocol {
  updateBlockFunc: () => void;
  toggleDeletionModal: () => void;
  currentBlockValues: BlockProtocol;
}

const DeletionFormModal: React.FC<UpdaterFormProtocol> = ({
  updateBlockFunc,
  toggleDeletionModal,
  currentBlockValues,
}) => {
  const [block, setBlock] = useState({
    hBlockName: "",
    content: "",
  });

  useEffect(() => {
    setBlock({
      hBlockName: currentBlockValues.hBlockName,
      content: currentBlockValues.content || "",
    });
  }, []);

  const deleteBlock = async () => {
    const { error } = await supabase
      .from("hashtags_Block")
      .delete()
      .eq("id", `${currentBlockValues.id}`);

    if (error) console.log(error);

    updateBlockFunc();
    toggleDeletionModal();
  };

  return (
    <div>
      <div className="absolute z-10 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-0 right-0 top-40 z-10 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toggleDeletionModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <div className="form my-5 flex flex-col items-center justify-center gap-12">
          <p className="p-4 text-xl font-bold">{`Deletar Bloco ${currentBlockValues.hBlockName}?`}</p>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={deleteBlock}
              className="flex w-20 items-center justify-center rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
            >
              Sim
            </button>
            <button
              className="flex w-20 items-center justify-center rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
              onClick={toggleDeletionModal}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletionFormModal;
