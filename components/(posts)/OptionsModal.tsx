"use client";

// interface UpdaterFormProtocol {
//   updateBlockFunc: () => void;
//   toggleDeletionModal: () => void;
//   currentBlockValues: BlockProtocol;
// }

interface OptionsModalProtocol {
  handleDelete: () => void;
  handleEdit: () => void;
  toggleOptionsModal: () => void;
}

const OptionsModal: React.FC<OptionsModalProtocol> = ({
  handleDelete,
  handleEdit,
  toggleOptionsModal,
}) => {
  // const [block, setBlock] = useState({
  //   hBlockName: "",
  //   content: "",
  // });

  // useEffect(() => {
  //   setBlock({
  //     hBlockName: currentBlockValues.hBlockName,
  //     content: currentBlockValues.content,
  //   });
  // }, []);

  // const deleteBlock = async () => {
  //   const { error } = await supabase
  //     .from("hashtags_Block")
  //     .delete()
  //     .eq("id", `${currentBlockValues.id}`);

  //   if (error) console.log(error);

  //   updateBlockFunc();
  //   toggleDeletionModal();
  // };

  return (
    <div>
      <div className="absolute z-20 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-0 right-0 top-40 z-30 mx-auto flex w-60 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toggleOptionsModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <div className="form my-5 flex flex-col items-center justify-center gap-5">
          <button
            onClick={handleEdit}
            className="rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
          >
            Editar Post
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
          >
            <span className="font-semibold text-red-600">Deletar</span> Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;
