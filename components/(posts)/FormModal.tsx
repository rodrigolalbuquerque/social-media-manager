"use client";
import { useState } from "react";
import supabase from "@/utils/supabaseClient";

interface ModalProtocol {
  updatePostsFunc: () => void;
  toggleModal: () => void;
}

const FormModal: React.FC<ModalProtocol> = ({
  updatePostsFunc,
  toggleModal,
}) => {
  const [file, setFile] = useState<File>();

  const [block, setData] = useState({
    hBlockName: "",
    content: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const acceptedTypes = ["image/jpeg", "image/png", "video/mp4"];

    if (!file) return;
    if (!acceptedTypes.includes(file.type)) {
      console.log("Arquivos permitidios: JPEG, JPG, PNG e MP4");
      return;
    }

    try {
      const mediaData = new FormData();
      mediaData.set("file", file);

      const avatarFile = file;
      const { error } = await supabase.storage
        .from("avatars")
        .upload("/", avatarFile, {
          cacheControl: "600",
          upsert: false,
        });
      if (error) console.log(error);
    } catch (e: any) {
      console.error(e);
    }
  };

  const updateFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const postForm = async () => {
    await fetch("/api/hashtags", {
      method: "POST",
      body: JSON.stringify(block),
      headers: { "Content-Type": "application/json" },
    });

    updatePostsFunc();
    toggleModal();
  };

  return (
    <div>
      <div className="absolute z-20 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-0 right-0 top-40 z-30 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toggleModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <div className="my-5 flex w-9/12 flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center">
            <span className="mb-2 text-xl">Imagem / Vídeo</span>
            <form onSubmit={onSubmit}>
              <input
                accept="image/jpeg, image/png, video/mp4, .jpeg, .jpg, .png, .mp4"
                className="w-60"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <button type="submit">Enviar</button>
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
            onClick={postForm}
            className="flex w-20 items-center justify-center rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
