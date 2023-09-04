"use client";
import { BlockProtocol } from "@/app/hashtags/page";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/example-from-docs";

interface UpdaterProtocol {
  toggleEditModal: () => void;
  updatePostsFunc: () => void;
  currentPostValues: BlockProtocol;
}

const UpdaterFormModal: React.FC<UpdaterProtocol> = ({
  toggleEditModal,
  updatePostsFunc,
  currentPostValues,
}) => {
  const [file, setFile] = useState<File>();

  const [postText, setPostText] = useState({
    hBlockName: "",
    content: "",
  });

  // useEffect(() => {
  //   setBlock({
  //     hBlockName: currentBlockValues.hBlockName,
  //     content: currentBlockValues.content || "",
  //   });
  // }, []);

  // const updateFormValue = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setBlock((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
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
      <div className="absolute z-10 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-0 right-0 top-40 z-10 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toogleEditModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <div className="form my-5 flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={onSubmit}>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <input type="submit" value="Upload" />
            </form>
          </div>
          <div className="hBlock flex flex-col items-center justify-center">
            <span className="mb-2 text-xl">Hashtags</span>
            <textarea
              onChange={updateFormValue}
              value={block.content}
              placeholder="Hashtags"
              required
              id="content"
              className="h-36 w-60 resize-none rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
            />
          </div>
          <button
            // onClick={updateBlock}
            className="flex w-20 items-center justify-center rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdaterFormModal;
