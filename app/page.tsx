"use client";
import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import FormModal from "@/components/(posts)/FormModal";
import OptionsModal from "@/components/(posts)/OptionsModal";
import UpdaterFormModal from "@/components/(posts)/UpdaterFormModal";
import DeletionFormModal from "@/components/(posts)/DeletionFormModal";

const postObject = {
  id: 0,
  post_text: [
    { id: 0, text: "", hashtags_Block: { hBlockName: "", content: "" } },
  ],
  post_img: [{ img: "", id: 0 }],
};

export interface PostProtocol {
  id: number;
  post_text: {
    id: number;
    text: string | null;
    hashtags_Block: {
      hBlockName: string;
      content: string;
    } | null;
  }[];
  post_img: { img: string | null; id: number }[];
}

export default function Page() {
  const [updatePosts, setUpdatePosts] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostProtocol[]>([postObject]);
  const [currentPostValues, setCurrentPostValues] =
    useState<PostProtocol>(postObject);
  const [modal, setModal] = useState(false);
  const [optionModal, setOptionsModal] = useState(false);
  const [updaterModal, setUpdaterModal] = useState(false);
  const [deletionModal, setDeletionModal] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data, error } = await supabase.from("post").select(`
        id,
        post_text ( id, text, hashtags_Block ( hBlockName, content ) ),
        post_img ( img, id )
    `);
        if (data) setPosts(data);
        if (error) console.log(error);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [updatePosts]);

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const toggleOptionsModal = () => {
    setOptionsModal((prevModal) => !prevModal);
  };

  const toggleDeleteModal = () => {
    setDeletionModal((prevModal) => !prevModal);
  };

  const toggleEditModal = () => {
    setUpdaterModal((prevModal) => !prevModal);
  };

  const updatePostsFunc = () => {
    setUpdatePosts((prevState) => !prevState);
    console.log("updatePostsFunc rodou!");
  };

  const updateCurrentPostValues = (post: PostProtocol) => {
    setCurrentPostValues(post);
  };

  const handleOptions = (post: PostProtocol) => {
    toggleOptionsModal();
    updateCurrentPostValues(post);
  };

  const handleEdit = () => {
    toggleEditModal();
    toggleOptionsModal();
  };

  const handleDelete = () => {
    toggleDeleteModal();
    toggleOptionsModal();
  };

  return (
    <main className="h-screen">
      {modal && (
        <FormModal
          updatePostsFunc={updatePostsFunc}
          toggleModal={toggleModal}
        />
      )}
      {optionModal && (
        <OptionsModal
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          toggleOptionsModal={toggleOptionsModal}
        />
      )}
      {deletionModal && (
        <DeletionFormModal
          toggleDeleteModal={toggleDeleteModal}
          updatePostsFunc={updatePostsFunc}
          currentPostValues={currentPostValues}
        />
      )}
      {updaterModal && (
        <UpdaterFormModal
          toggleEditModal={toggleEditModal}
          updatePostsFunc={updatePostsFunc}
          currentPostValues={currentPostValues}
        />
      )}
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="mr-20 mt-20 rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
        >
          &#10133; Novo Post
        </button>
      </div>
      <section className="flex h-screen items-center justify-center gap-10">
        {posts?.map((post) => {
          return (
            <div
              key={post.id}
              className="relative flex w-72 flex-col gap-3 bg-slate-50"
            >
              <button
                onClick={() => handleOptions(post)}
                className="absolute right-1 top-1 z-10 bg-slate-700 text-center text-2xl text-white"
              >
                &#10247;
              </button>
              <div className="h-96 w-full">
                <img
                  className="h-full w-full object-cover"
                  alt=""
                  src={post.post_img[0]?.img ?? "/noImg.jpg"}
                />
              </div>
              <div className="h-52 w-full">
                <p>{`${post.post_text[0]?.text} `}</p>
                <p className="text-sky-600">
                  {post.post_text[0]?.hashtags_Block?.content ?? ""}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
