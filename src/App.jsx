// Importações
import { AuthProvider } from "./context/AuthContext";
import { TeamsProvider } from "./context/TeamsContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast"; 

// Código principal
function App() {
  return (
    <AuthProvider>
      <TeamsProvider>
        {/* Rotas principais */}
        <AppRoutes />

        {/* ✅ Componente global de notificações */}
        <Toaster position="top-right" reverseOrder={false} />
      </TeamsProvider>
    </AuthProvider>
  );
}

export default App;
