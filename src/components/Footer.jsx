import React from "react";
import {Instagram} from 'lucide-react'

export const Footer = () => {
    return (
      <footer className="w-full text-sm  text-white/80">
        <div className="max-w-7xl mx-auto px-6 py-7 flex flex-wrap justify-center md:justify-between items-center space-y-2 md:space-y-0">
          
          {/* Links */}
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="hover:underline">Contrato do Usuário</a>
            <a href="#" className="hover:underline">Política de Privacidade do X2+</a>
            <a href="#" className="hover:underline">Diretrizes da Comunidade</a>
            <a href="#" className="hover:underline">Política dos Cookies</a>
            <a href="#" className="hover:underline">Enviar feedback</a>
            <a href="https://www.instagram.com/x2.jogosjuvenis?igsh=Z29wbHhzbnl3anpn"><Instagram  className="size-5"/></a>
            
          </div>
  
          {/* Idioma */}
          <div className="relative">
            <select className="bg-transparent border-none text-white/80 focus:outline-none cursor-pointer">
              <option className="text-black/80">Português</option>
              <option className="text-black/80">English</option>
              <option className="text-black/80">Español</option>
            </select>
          </div>
        </div>
      </footer>
    );
  }
  