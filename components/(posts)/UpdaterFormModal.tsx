"use client";
import { PostProtocol } from "@/app/page";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";

interface UpdaterProtocol {
  toggleEditModal: () => void;
  updatePostsFunc: () => void;
  currentPostValues: PostProtocol;
}

interface BlocksProtocol {
  content: string;
  hBlockName: string;
  id: number;
}

const blockObject = {
  content: "",
  hBlockName: "",
  id: 1,
};

const UpdaterFormModal: React.FC<UpdaterProtocol> = ({
  toggleEditModal,
  updatePostsFunc,
  currentPostValues,
}) => {
  const [file, setFile] = useState<File>();
  const [postText, setpostText] = useState("");
  const [hashtagsBlock, setHashtagsBlock] = useState<BlocksProtocol[]>([
    blockObject,
  ]);
  const [blockName, setBlockName] = useState("");

  const currentBlockName =
    currentPostValues.post_text[0]?.hashtags_Block?.hBlockName;

  useEffect(() => {
    setpostText(currentPostValues.post_text[0]?.text);
    if (currentBlockName) {
      setBlockName(currentBlockName);
    } else {
      setBlockName("Selecione");
    }
    const getBlocks = async () => {
      const res = await fetch("/api/hashtags");
      const blocks = await res.json();
      setHashtagsBlock(blocks);
    };

    getBlocks();
  }, []);

  const updateFormValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setpostText(e.target.value);
  };

  const updateFileFromStorage = async () => {
    if (file) {
      const fileName = currentPostValues.post_img[0].img?.match(/\/([^\/]+)\?/);
      if (fileName) {
        const { error } = await supabase.storage
          .from("post-file")
          .upload(fileName[1], file, { upsert: true });
        if (error) {
          console.log(error);
          return error;
        }
      }
    }
  };

  const updateFileUrlQueryString = async () => {
    const fileUrl = currentPostValues.post_img[0].img;
    const updatedUrl = fileUrl?.replace(/[0-9]+$/gm, `${Date.now()}`);

    if (fileUrl) {
      const { error } = await supabase
        .from("post_img")
        .update({ img: updatedUrl })
        .eq(`id`, `${currentPostValues.post_img[0].id}`);

      if (error) {
        console.log(error);
        return error;
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await updateFileFromStorage()) return;

    if (await updateFileUrlQueryString()) return;

    if (postText && postText !== currentPostValues.post_text[0]?.text) {
      console.log("Texto enviado: ", postText);
    }

    if (blockName !== "Selecione" && blockName !== currentBlockName) {
      console.log("Bloco enviado: ", blockName);
    }

    updatePostsFunc();
    toggleEditModal();
  };

  // const updateBlock = async () => {
  //   const { error } = await supabase
  //     .from("hashtags_Block")
  //     .update({
  //       hBlockName: `${block.hBlockName}`,
  //       content: `${block.content}`,
  //     })
  //     .eq("id", currentBlockValues.id);

  //   updateBlockFunc();
  //   toogleEditModal();
  // };

  return (
    <div>
      <div className="absolute z-20 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-[50%] z-30 flex w-[500px] -translate-x-2/4 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toggleEditModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <form
          onSubmit={onSubmit}
          className="my-7 flex flex-col items-center justify-center gap-9"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="mb-2 text-2xl font-bold">Nova Imagem / Vídeo</span>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="mb-2 text-2xl font-bold">Texto do Post</span>
            <textarea
              onChange={updateFormValue}
              value={postText}
              placeholder="Post Text"
              id="content"
              className="h-40 w-96 resize-none rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="mb-2 text-2xl font-bold">Hashtags</span>
            <select
              value={blockName}
              onChange={(e) => {
                setBlockName(e.target.value);
              }}
            >
              {hashtagsBlock.map((block) => (
                <option value={block.hBlockName} key={block.id}>
                  {block.hBlockName}
                </option>
              ))}
              <option value="Selecione">Selecione</option>
            </select>
          </div>
          <button
            className="rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
            type="submit"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdaterFormModal;
