import { useState, useEffect } from "react";
import { Edit3, Save, X, Plus, Trash, ImagePlus } from "lucide-react";

export const AdmSponsorEdit = () => {
  const [editing, setEditing] = useState(false);
  const [patrocinadores, setPatrocinadores] = useState([
    { src: "/patr1.svg", alt: "PATR 1" },
    { src: "/patr2.svg", alt: "PATR 2" },
    { src: "/patr3.svg", alt: "PATR 3" },
    { src: "/patr3.svg", alt: "PATR 3" },
    { src: "/patr1.svg", alt: "PATR 1" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("sponsorData");
    if (saved) setPatrocinadores(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem("sponsorData", JSON.stringify(patrocinadores));
    setEditing(false);
  };

  const handleAdd = () => {
    setPatrocinadores([...patrocinadores, { src: "", alt: "" }]);
  };

  const handleRemove = (index) => {
    setPatrocinadores(patrocinadores.filter((_, i) => i !== index));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newPatr = [...patrocinadores];
        newPatr[index].src = ev.target.result;
        setPatrocinadores(newPatr);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-accent mb-6 border-b-2 border-accent pb-2">
        PATROCINADORES
      </h1>

      <div className="min-h-screen flex flex-col items-center justify-start bg-dark pt-10 px-6">
        
        <div className="flex flex-col items-center">
          <img
            src="/X2logoY.svg"
            alt="Logo"
            className="w-64 h-64 object-contain drop-shadow-xl"
          />
        </div>

        <h1 className="mt-6 text-2xl md:text-3xl font-extrabold tracking-widest text-accent">
          PATROCINADORES
        </h1>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
          {patrocinadores.map((patr, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {editing ? (
                <>
                  {patr.src ? (
                    <img
                      src={patr.src}
                      alt={patr.alt}
                      className="w-32 md:w-40 rounded-md border border-accent hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 border-2 border-dashed border-accent flex items-center justify-center text-gray-500">
                      Sem imagem
                    </div>
                  )}

                  <div className="bg-accent rounded-2xl">
                    <label
                      htmlFor={`file-input-${index}`}
                      className="flex cursor-pointer items-center gap-2 bg-light hover:bg-light/80 text-white font-bold px-5 py-2 rounded-lg shadow-md"
                    >
                      Escolher arquivo
                      <div className="pl-2"><ImagePlus /></div>
                    </label>
                    <input
                      id={`file-input-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                      className="hidden"
                    />
                  </div>

                  <input
                    type="text"
                    value={patr.alt}
                    onChange={(e) => {
                      const newPatr = [...patrocinadores];
                      newPatr[index].alt = e.target.value;
                      setPatrocinadores(newPatr);
                    }}
                    placeholder="Descrição da imagem"
                    className="border bg-white border-accent rounded-md p-1 text-sm w-32"
                  />

                  <button
                    onClick={() => handleRemove(index)}
                    className="cursor-pointer text-red-500 hover:text-red-700 mt-1"
                  >
                    <Trash size={16} />
                  </button>
                </>
              ) : (
                <img
                  src={patr.src}
                  alt={patr.alt}
                  className="w-32 md:w-40 hover:scale-110 transition-transform duration-300"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          {editing ? (
            <>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-light hover:bg-light/80 cursor-pointer text-white font-bold px-6 py-2 rounded-lg shadow-md transition"
              >
                <Plus size={18} /> ADICIONAR
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-light hover:bg-light/80 cursor-pointer text-white font-bold px-6 py-2 rounded-lg shadow-md transition"
              >
                <Save size={18} /> SALVAR
              </button>

              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 cursor-pointer text-white font-bold px-6 py-2 rounded-lg shadow-md transition"
              >
                <X size={18} /> CANCELAR
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-light hover:bg-light/80 cursor-pointer text-white font-bold px-6 py-2 rounded-lg shadow-md transition"
            >
              <Edit3 size={18} /> EDITAR
            </button>
          )}
        </div>
      </div>
    </main>
  );
};
