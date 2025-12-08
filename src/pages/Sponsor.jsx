import React from "react";

export const Sponsor = () => {
  const patrocinadores = [
    { src: "/patr1.svg", alt: "PATR 1" },
    { src: "/patr2.svg", alt: "PATR 2" },
    { src: "/patr3.svg", alt: "PATR 3" },
    { src: "/patr3.svg", alt: "PATR 3" },
    { src: "/patr1.svg", alt: "PATR 1" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-darki pt-10">

      {/* Logo principal */}
      <div className="flex flex-col items-center">
        <img
          src="/X2logoY.svg"
          alt="Logo"
          className="w-68 h-68 object-contain drop-shadow-xl"
        />
      </div>

      {/* Título */}
      <h1 className="mt-6 text-2xl md:text-3xl font-extrabold tracking-widest text-accent">
        PATROCINADORES
      </h1>

      {/* Linha de logos */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-10 place-items-center px-6">
        {patrocinadores.map((patr, index) => (
          <img
            key={index}
            src={patr.src}
            alt={patr.alt}
            className="w-32 md:w-40 hover:scale-110 transition-transform duration-300"
          />
        ))}
      </div>

    </div>
  );
};
