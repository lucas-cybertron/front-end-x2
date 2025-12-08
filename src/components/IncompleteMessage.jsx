import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DevMessageButton = ({ buttonText = "Testar botão" }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // desaparece após 3s
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Botão */}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>

      {/* Mensagem animada */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute mt-14 flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-xl shadow-lg"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Página ainda em desenvolvimento</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
