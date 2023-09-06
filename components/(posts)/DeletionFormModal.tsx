"use client";
import { PostProtocol } from "@/app/page";
import { supabase } from "@/utils/example-from-docs";

interface DeleteProtocol {
  toggleDeleteModal: () => void;
  updatePostsFunc: () => void;
  currentPostValues: PostProtocol;
}

const DeletionFormModal: React.FC<DeleteProtocol> = ({
  toggleDeleteModal,
  updatePostsFunc,
  currentPostValues,
}) => {
  const deleteRowFromPost = async () => {
    const { error } = await supabase
      .from("post")
      .delete()
      .eq("id", `${currentPostValues.id}`);

    if (error) console.log(error);
  };

  const deleteFileFromStorage = async () => {
    const seccionedUrl = currentPostValues.post_img[0].img?.split("/");
    if (!seccionedUrl) throw new Error("url da imagem não encontrada");
    const fileName = seccionedUrl[seccionedUrl.length - 1];
    const { error } = await supabase.storage
      .from("post-file")
      .remove([fileName]);
    console.log(fileName);
    if (error) console.log(error);
  };

  const deletePost = async () => {
    await deleteRowFromPost();
    await deleteFileFromStorage();
    toggleDeleteModal();
    updatePostsFunc();
  };

  return (
    <div>
      <div className="absolute z-20 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-0 right-0 top-40 z-30 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toggleDeleteModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <div className="form my-5 flex flex-col items-center justify-center gap-12">
          <p className="p-4 text-xl font-bold">Deletar Post?</p>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={deletePost}
              className="flex w-20 items-center justify-center rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
            >
              Sim
            </button>
            <button
              className="flex w-20 items-center justify-center rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
              onClick={toggleDeleteModal}
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
