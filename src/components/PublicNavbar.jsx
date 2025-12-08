import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // ⭐ NAVIGATION ATUALIZADA — CONTATO SOME PARA ADM
  const navLink = [
    { to: "/", label: "Home" },
    { to: "/games", label: "Jogos" },
    { to: "/about", label: "Sobre" },

      ...( (user?.type || '').toString().toLowerCase() !== 'admin'
      ? [{ to: "/contact", label: "Contato" }]
      : []),

    { to: "/login", label: "Login" },
  ];

  const isActive = (path) => location.pathname === path;
  const isNewEdition = location.pathname === "/newedition";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`backdrop-blur-md sticky top-0 z-50 border-white/20 transition-colors duration-500
        ${isNewEdition ? "" : "to-yellow bg-gradient-to-r from-accent to-dark"}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 md:px-2 md:py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/">
              <div className="flex items-center relative">
                <img
                  src="/navlogo.svg"
                  alt="logotipo site X2"
                  className="w-32 h-auto md:w-40 md:h-auto"
                />
                <div className="absolute inset-1 bg-gradient-to-r rounded-xl blur opacity-30 md:rounded-b-xl"></div>
              </div>
            </Link>

            {/* Links Desktop */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {navLink.slice(0, -1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`hidden sm:block font-extrabold transition-colors text-sm md:text-[20px] mr-12 ${
                    isActive(link.to)
                      ? isNewEdition
                        ? "text-yellow-300"
                        : "text-accent"
                      : isNewEdition
                      ? "text-yellow-100 hover:text-yellow-300"
                      : "text-white hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Seção ADM */}
                {(user?.type || '').toString().toLowerCase() === "admin" && (
                <Link
                  to="/admplayersedit"
                  className="hidden sm:block font-extrabold transition-colors text-sm md:text-[20px] mr-12 text-white hover:text-accent"
                >
                  Seção ADM
                </Link>
              )}

              {/* Botão Login / Logout */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className={`cursor-pointer border-3 px-4 py-1 md:px-8 rounded-lg font-bold hover:shadow-lg transition-all duration-300 text-sm md:text-base
                    ${
                      isNewEdition
                        ? "border-yellow-300 text-yellow-200 hover:text-yellow-100"
                        : "border-accent text-accent"
                    }`}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button
                    className={`cursor-pointer border-3 px-4 py-1 md:px-8 rounded-lg font-bold hover:shadow-lg transition-all duration-300 text-sm md:text-base
                      ${
                        isNewEdition
                          ? "border-yellow-300 text-yellow-200 hover:text-yellow-100"
                          : "border-accent text-accent"
                      }`}
                  >
                    <span className="hidden sm:inline">Entrar</span>
                    <span className="sm:hidden">Login</span>
                  </button>
                </Link>
              )}

              {/* Ícone perfil */}
              {user && (
                <Link to="/profile">
                  <div className="flex items-center justify-center bg-white p-2 rounded-full cursor-pointer hover:bg-light transition-colors duration-300">
                    <UserCircle size={28} />
                  </div>
                </Link>
              )}
            </div>

            {/* Botão menu mobile */}
            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors ${
                  isNewEdition
                    ? "text-yellow-200 hover:text-yellow-100"
                    : "text-white hover:text-accent"
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Menu Mobile */}
          {isOpen && (
            <div className="md:hidden mt-4 transition-all duration-300">
              <div
                className={`px-2 pt-2 pb-2 space-y-1 rounded-lg ${
                  isNewEdition
                    ? "bg-newdark/70"
                    : "bg-white/80 backdrop-blur-md"
                }`}
              >

                {/* Seção ADM mobile */}
                  {(user?.type || '').toString().toLowerCase() === "admin" && (
                  <Link
                    to="/admplayersedit"
                    className="block px-3 py-1 rounded-lg text-white hover:text-accent hover:bg-light/5 font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Seção ADM
                  </Link>
                )}

                {navLink.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-3 py-1 rounded-lg transition-colors ${
                      isActive(link.to)
                        ? isNewEdition
                          ? "text-yellow-300 bg-yellow-100/10 font-semibold"
                          : "text-accent bg-light/10 font-semibold"
                        : isNewEdition
                        ? "text-yellow-100 hover:text-yellow-300 hover:bg-yellow-100/5"
                        : "text-dark/70 hover:text-accent hover:bg-light/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1 rounded-lg transition-colors ${
                      isNewEdition
                        ? "text-yellow-300 hover:bg-yellow-100/10"
                        : "text-red-600 hover:bg-red-100"
                    }`}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
