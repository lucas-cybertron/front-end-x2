// 📌 Sidebar reutilizável
// Esse componente é a barra lateral de navegação do sistema.
// Ela se adapta para desktop (fixa na esquerda) e para mobile (abre/fecha com botão).
// Também exibe informações do usuário autenticado e botões de navegação diferentes
// dependendo do tipo de usuário (psicólogo ou paciente).

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Ícones importados da lib lucide-react
import {
  Menu,
  X,
  LogOut,
  Calendar,
  UserRound,
  User,
  Users,
  Group,
  Award
} from 'lucide-react';
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { RiFootballFill } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";
import { MdNewReleases } from "react-icons/md";

export const Sidebar = () => {
  // Estado que controla se o menu mobile está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Pega usuário logado e função de logout do contexto
  const { user, logout } = useAuth();

  // Hooks do React Router
  const navigate = useNavigate(); // navegação programática
  const location = useLocation(); // rota atual, útil para destacar link ativo

  // 📌 Função para fazer logout
  const handleLogout = () => {
    logout();           // limpa o contexto
    navigate('/login'); // redireciona para página de login
  };

  // 📌 Links de navegação, diferentes para psicólogo ou paciente
  const navLinks =
    (user?.type || '').toString().toLowerCase() === 'admin'
      ? [
        { to: '/admplayersedit', label: 'Jogadores', icon: User },
        { to: '/admsponsoredit', label: 'Patrocinadores', icon: FaRegHandshake },
      ]
      : [

      ];

  const funcLinks =
    (user?.type || '').toString().toLowerCase() === 'admin'
      ? [
        { to: '/admteamsedit', label: 'Editar Times', icon: Users },
        { to: '/admgroupsedit', label: 'Editar Grupos', icon: Group },
        { to: '/admmatchesedit', label: 'Editar Partidas', icon: Award }
      ]
      : [

      ];

  // 📌 Função para verificar se o link é o atual
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 📌 Botão Hamburguer para abrir/fechar menu em telas pequenas */}
      <button
        // Ao clicar, alterna o estado isOpen entre true e false
        onClick={() => setIsOpen(!isOpen)}

        // Tailwind CSS classes
        className="
    lg:hidden       /* Oculta o botão em telas grandes (largura >= lg) */
    fixed           /* Posiciona o botão fixo em relação à tela */
    top-4           /* Distância do topo: 1rem (16px) */
    left-4          /* Distância da esquerda: 1rem (16px) */
    z-50            /* Garante que o botão fique acima de outros elementos */
    text-white      /* Cor do ícone/texto branca */
    p-2             /* Padding interno: 0.5rem (8px) */
    rounded-2xl    /* Bordas arredondadas grandes */
    shadow-lg       /* Sombra grande para destaque */
  "

        // Atributo de acessibilidade, descrevendo o propósito do botão
        aria-label="Menu"
      >
        {/* Alterna entre ícone de abrir (Menu) e fechar (X) */}
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 📌 Sidebar principal */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-br bg-medium 
          shadow-xl transform transition-transform duration-300 z-40 ${
          // Se estiver aberta: fica visível (translate-x-0)
          // Se fechada em mobile: sai da tela à esquerda (-translate-x-full)
          // Em telas grandes (lg:), sempre visível (translate-x-0)
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* 📌 Logo da aplicação */}
          <div className="flex items-center space-x-3 p-6 border-b-2 border-white/60">
            {/* Logo com cantos arredondados */}
            <img src="/logo-big.svg" alt="X2" className="w-150 h-16 rounded-lg items-center justify-center" />
            <div>

            </div>
          </div>

          {/* 📌 Informações do usuário logado */}
          <div className="p-6 border-b-2 border-white/60">
            <div className="flex items-center space-x-3">
              {/* Avatar genérico com fundo gradiente */}
              <div className="w-10 h-10 bg-gradient-to-br from-light to-accent 
              rounded-full flex items-center justify-center">
                <UserRound className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">{user?.name}</p>
                {/* Tipo de usuário (psicólogo ou paciente) */}
                <p className="text-xs text-white/60 capitalize font-semibold">Administrador</p>
              </div>
            </div>
          </div>

          {/* 📌 Navegação (lista de links) */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    // Estilo muda se o link for o ativo
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive(link.to)
                        ? 'bg-light text-white' // ativo: fundo claro + texto branco
                        : 'text-white hover:text-white hover:bg-white/10' // inativo: texto cinza, hover melhora contraste
                      }`}
                    onClick={() => setIsOpen(false)} // Fecha menu mobile ao clicar
                  >
                    {/* Ícone do link */}
                    <link.icon size={20} />
                    {/* Nome do link */}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-6 border-b-2 border-white/60"></div>
          <div className='bg-white'></div>    
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {funcLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    // Estilo muda se o link for o ativo
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive(link.to)
                        ? 'bg-light text-white' // ativo: fundo claro + texto branco
                        : 'text-white hover:text-white hover:bg-white/10' // inativo: texto cinza, hover melhora contraste
                      }`}
                    onClick={() => setIsOpen(false)} // Fecha menu mobile ao clicar
                  >
                    {/* Ícone do link */}
                    <link.icon size={20} />
                    {/* Nome do link */}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 📌 Botão de Logout */}
          <div className="p-4 border-t-2 border-white/70">
            <a href="/">
              <button
                className="flex items-center space-x-3 w-full text-[17px] px-4 py-3 text-white 
              font-bold hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut size={30} />
                <span>Ver as páginas</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* 📌 Overlay (fundo escuro) quando o menu mobile está aberto */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)} // Clica fora para fechar
        />
      )}
    </>
  );
};