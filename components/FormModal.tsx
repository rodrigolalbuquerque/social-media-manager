import { useState } from "react";

interface ModalProp {
  toggleModal: () => void;
}

const FormModal: React.FC<ModalProp> = ({ toggleModal }) => {
  const [block, setData] = useState({
    hBlockName: "",
    content: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const updateFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    console.log(block);
  };

  const postForm = async () => {
    const res = await fetch("/api/hashtags", {
      method: "POST",
      body: JSON.stringify(block),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    console.log(typeof data);
  };

  return (
    <div>
      <div className="absolute z-10 h-screen w-screen bg-black opacity-60"></div>
      <div className="fixed left-0 right-0 top-40 z-10 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
        <button
          onClick={toggleModal}
          className="absolute right-2 top-2 text-xl"
        >
          &#128473;
        </button>
        <div className="form my-5 flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col items-center justify-center">
            <span className="mb-2 text-xl">Nome do Bloco</span>
            <input
              onChange={updateFormValue} //same as (e)=>updateFormValue(e)
              value={block.hBlockName}
              placeholder="Nome do Bloco"
              required
              type="text"
              id="hBlockName"
              className="name w-60 rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
            />
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
            className="w-20 rounded-md border border-black bg-slate-50 px-5 py-2 drop-shadow-md"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
