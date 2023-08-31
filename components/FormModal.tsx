import { useState } from "react";

export default function FormModal() {
  const [block, setData] = useState({
    hBlockName: "",
    content: "",
  });

  function handle(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    console.log(block);
  }

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
    <div className="absolute left-0 right-0 top-40 z-10 mx-auto flex w-80 flex-col items-center justify-center rounded-md border border-black bg-slate-50 drop-shadow-md">
      <div className="form my-5 flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="name" className="mb-2 text-xl">
            Nome do Bloco
          </label>
          <input
            onChange={handle} //same as (e)=>handle(e)
            value={block.hBlockName}
            placeholder="Nome do Bloco"
            required
            type="text"
            id="hBlockName"
            className="name w-60 rounded-md border border-black bg-slate-50 p-2 text-lg drop-shadow-md"
          />
        </div>
        <div className="hBlock flex flex-col items-center justify-center">
          <label htmlFor="content" className="mb-2 text-xl">
            Hashtags
          </label>
          <textarea
            onChange={handle}
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
  );
}
