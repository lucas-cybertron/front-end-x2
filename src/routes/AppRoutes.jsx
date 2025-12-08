// Importação de rotas do React Router
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Importa contexto de autenticação
import { useAuth } from '../context/AuthContext';

// Componentes reutilizáveis
import { PublicNavbar } from '../components/PublicNavbar';
import { PrivateNavbar } from '../components/PrivateNavbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from "../components/Footer";
import { LoadingSpinner } from '../components/LoadingSpinner';

// Páginas públicas
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Login } from '../pages/Login';
import { Games } from '../pages/Games';
import { Contact } from '../pages/Contact';
// import { Register } from '../pages/Register';
// import { NotFound } from '../pages/NotFound';


// Páginas protegidas (apenas para usuários autenticados)
import { Sponsor } from '../pages/Sponsor';
import { AdmSponsorEdit } from '../pages/AdmSponsorEdit';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';

import { Moments } from '../pages/Moments'
import { AdmPlayersEdit } from '../pages/AdmPlayersEdit';
import { AdmTeamsEdit } from '../pages/AdmTeamsEdit';
import { AdmMatchesEdit } from '../pages/AdmMatchesEdit';
import { AdmGroupsEdit } from '../pages/AdmGroupsEdit';

/* ==============================
   Componente de rota protegida
   ============================== */
   const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
  
    if (loading) return <LoadingSpinner size="lg" />;
    if (!user) return <Navigate to="/login" replace />;
  
    // Normaliza tipos para comparação (case-insensitive)
    const userType = (user?.type || '').toString().toLowerCase();
    const allowed = Array.isArray(allowedRoles)
      ? allowedRoles.map((r) => r.toString().toLowerCase())
      : [];

    if (allowed.length > 0 && !allowed.includes(userType)) {
      return <Navigate to="/" replace />;
    }
  
    return (
      <>
        <navbar>
          <PrivateNavbar />
        </navbar>
  
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64 p-8">
            {children}
          </main>
        </div>
      </>
    );
  };

/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  // Redireciona conforme tipo de usuário (case-insensitive)
  if (user && isAuthPage) {
    const t = (user?.type || '').toString().toLowerCase();
    if (t === 'admin') {
      return <Navigate to="/admplayersedit" replace />;
    } else {
      return <Navigate to="/" replace />; // paciente
    }
  }
  return (
    <div className="bg-cover bg-center min-h-screen w-full "
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="min-h-screen">
        <PublicNavbar /> {/* Navbar pública */}
        <main className="mx-auto">
          {children} {/* Conteúdo da página pública */}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};


/* ==============================
   Componente Dashboard condicional
   ============================== */
const Dashboard = () => {
  const { user } = useAuth();
  // Retorna dashboard específico baseado no tipo do usuário (case-insensitive)
  const t = (user?.type || '').toString().toLowerCase();
  return t === 'admin' ? <DashboardPsicologo /> : <DashboardPaciente />;
};

/* ==============================
   Configuração de rotas da aplicação
   ============================== */
export const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* ==============================
           Rotas Públicas
           ============================== */}
        <Route path="/" element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />
        <Route path="/about" element={
          <PublicRoute>
            <About />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/moments" element={
          <PublicRoute>
            <Moments />
          </PublicRoute>
        } />
        <Route path="/profile" element={
          <PublicRoute>
            <Profile />
          </PublicRoute>
        } />
        <Route path="/games" element={
          <PublicRoute>
            <Games />
          </PublicRoute>
        } />
        <Route path="/sponsor" element={
          <PublicRoute>
            <Sponsor />
          </PublicRoute>
        } />
          <Route path="/contact" element={
          <PublicRoute>
            <Contact />
          </PublicRoute>
        } />
        {/* ==============================
           Rotas Protegidas
           ============================== */}
        <Route path="/admsponsoredit" element={
          <ProtectedRoute>
            <AdmSponsorEdit /> 
          </ProtectedRoute>
        } />
        <Route path="/admplayersedit" element={
          <ProtectedRoute>
            <AdmPlayersEdit /> 
          </ProtectedRoute>
        } />
        <Route path="/admteamsedit" element={
          <ProtectedRoute>
            <AdmTeamsEdit /> 
          </ProtectedRoute>
        } />
        <Route path="/admmatchesedit" element={
          <ProtectedRoute>
            <AdmMatchesEdit /> 
          </ProtectedRoute>
        } />
        <Route path="/admgroupsedit" element={
          <ProtectedRoute>
            <AdmGroupsEdit /> 
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
};