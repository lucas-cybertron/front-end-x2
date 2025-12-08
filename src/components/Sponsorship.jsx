import React from "react";
 
export const Patrocinadores = () => {
  const logos = [
    "/patr1.svg",
    "/patr2.svg",
    "/patr3.svg",
    "/patr4.svg",
    "/patr5.svg",
  ];
 
  return (
    <div className="overflow-hidden bg-black py-8 relative">
      <div className="flex animate-slide space-x-12 w-max pause">
        {logos.concat(logos).map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt="logo patrocinador"
            className="h-16 md:h-20 lg:h-24 w-auto opacity-80 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};
 
 