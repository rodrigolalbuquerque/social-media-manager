"use client";
import DeletionFormModal from "@/components/(hashtag)/DeletionFormModal";
import FormModal from "@/components/(hashtag)/FormModal";
import UpdaterFormModal from "@/components/(hashtag)/UpdaterFormModal";
import supabase from "@/utils/supabaseClient";
import { useState, useEffect } from "react";

export interface BlockProtocol {
  content: string | null;
  hBlockName: string;
  id: number;
}

type BlocksProtocol = BlockProtocol[] | null;

const Page = () => {
  const [modal, setModal] = useState(false);
  const [updaterModal, setUpdaterModal] = useState(false);
  const [deletionModal, setDeletionModal] = useState(false);
  const [blocks, setBlocks] = useState<BlocksProtocol>(null);
  const [updateBlock, setUpdateBlock] = useState<boolean>(false);
  const [currentBlockValues, setcurrentBlockValues] = useState<BlockProtocol>({
    content: "",
    hBlockName: "",
    id: 0,
  });

  useEffect(() => {
    const getBlocks = async () => {
      try {
        const { data, error } = await supabase
          .from("hashtags_Block")
          .select("*");
        setBlocks(data);
        if (error) console.log(error);
      } catch (error) {
        console.log(error);
      }
    };

    getBlocks();
  }, [updateBlock]);
  //Avoid objects as dependencies --> infinitie loop

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const closeModal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      if (modal) toggleModal();
      if (updaterModal) toogleEditModal();
      if (deletionModal) toggleDeletionModal();
    }
  };

  const updateBlockFunc = () => {
    setUpdateBlock((prevState) => !prevState);
  };

  const handleEdit = (block: BlockProtocol) => {
    toogleEditModal();
    updateCurrentBlockValues(block);
  };

  const toogleEditModal = () => {
    setUpdaterModal((prevState) => !prevState);
  };

  const updateCurrentBlockValues = (block: BlockProtocol) => {
    setcurrentBlockValues(block);
  };

  const toggleDeletionModal = () => {
    setDeletionModal((PrevState) => !PrevState);
  };

  const handleDelete = (block: BlockProtocol) => {
    toggleDeletionModal();
    updateCurrentBlockValues(block);
  };

  return (
    <div onKeyDown={closeModal} className="relative h-screen">
      {modal && (
        <FormModal
          updateBlockFunc={updateBlockFunc}
          toggleModal={toggleModal}
        />
      )}
      {updaterModal && (
        <UpdaterFormModal
          updateBlockFunc={updateBlockFunc}
          toogleEditModal={toogleEditModal}
          currentBlockValues={currentBlockValues}
        />
      )}
      {deletionModal && (
        <DeletionFormModal
          updateBlockFunc={updateBlockFunc}
          toggleDeletionModal={toggleDeletionModal}
          currentBlockValues={currentBlockValues}
        />
      )}
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
            className="min-h-72 relative w-72 max-w-lg rounded-md border border-black bg-slate-50 drop-shadow-md lg:h-96"
          >
            <button
              onClick={() => handleDelete(block)}
              className="absolute right-2 top-2 text-xl"
            >
              &#128473;
            </button>
            <div className="flex items-center">
              <h2 className="mb-7 p-5 text-3xl">{block.hBlockName}</h2>
              <button
                onClick={() => handleEdit(block)}
                className="mb-5 h-8 rounded-md border border-black bg-slate-50 p-2 text-center leading-3 drop-shadow-md"
              >
                Editar
              </button>
            </div>
            <p className="p-5 text-lg">{block.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
