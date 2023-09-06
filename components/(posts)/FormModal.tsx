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

  const storeFile = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("post-file")
      .upload(`${file.name}-${Date.now()}`, file);
    if (error) console.log(error);
    if (data) return data.path;
  };

  const InsertOnPost = async () => {
    const { data, error } = await supabase.from("post").insert([{}]).select();
    if (error) console.log(error);
    if (data) {
      return data[0].id;
    } else {
      return 0;
    }
  };

  const InsertOnPostImg = async (postId: number, imgPath: string) => {
    await supabase.from("post_img").insert([
      {
        postId: postId,
        img: `https://gipxfbdqcjrzcpmcfxoq.supabase.co/storage/v1/object/public/post-file/${imgPath}`,
      },
    ]);
  };

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imgPath = await storeFile();
    if (!imgPath) return;
    const postId = await InsertOnPost();
    await InsertOnPostImg(postId, imgPath);
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
        <div className="my-5 flex w-9/12 flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <span className="mb-2 text-xl">Imagem / Vídeo</span>
            <form
              onSubmit={createPost}
              className="flex flex-col items-center justify-center gap-6"
            >
              <input
                accept="image/jpeg, image/png, video/mp4, .jpeg, .jpg, .png, .mp4"
                className="mt-5 w-60"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <button
                className="rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
