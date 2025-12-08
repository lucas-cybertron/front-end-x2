// src/pages/Momentos.jsx
import React from "react";

export const Moments = () => {
  const momentos = [
    {
      titulo: "UM MOMENTO HISTÓRICO:",
      texto: "A primeira conquista do torneio regional, onde o time mostrou união e coragem.",
      imagem: "/momentos1.jpg",
    },
    {
      titulo: "UMA HISTÓRIA INSPIRADORA:",
      texto: "João, nosso jovem goleiro, superou uma lesão e voltou ainda mais forte para inspirar o time.",
      imagem: "/momentos2.jpg",
    },
    {
      titulo: "O QUE ISSO NOS ENSINA:",
      texto: "Que o futebol vai além das vitórias — é sobre crescer juntos e nunca desistir.",
      imagem: "/momentos3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center py-12 px-4 md:px-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-white tracking-wide">
        Momentos Históricos & Histórias Inspiradoras ⚽
      </h1>

      <div className="flex flex-col gap-16 w-full max-w-5xl">
        {momentos.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            <div
              className="relative rotate-[-3deg] md:w-1/2 bg-white p-2 shadow-md rounded-md"
              style={{
                boxShadow: "4px 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.imagem}
                alt={item.titulo}
                className="rounded-sm w-full object-cover"
              />
            </div>

            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-lg md:text-xl font-semibold text-momentext mb-2 uppercase tracking-wide">
                {item.titulo}
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-md mx-auto md:mx-0">
                {item.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
