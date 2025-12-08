import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import toast from "react-hot-toast";
 
export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
 
  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem");
      return;
    }
    setLoading(true);
    try {
      // Segurança: forçar registro público como 'user'
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone || undefined,
        // envie birthDate se preenchido
        ...(formData.birthDate ? { birthDate: formData.birthDate } : {}),
        type: 'user',
      };

      const user = await register(payload);
      toast.success('Conta criada com sucesso!');

      // navegação baseada no role retornado (case-insensitive)
      const role = (user?.type || '').toString().toLowerCase();
      if (role === 'admin') {
        navigate('/admgamesedit');
      } else {
        navigate('/client');
      }
    } catch (error) {
      const msg = error?.response?.data?.detail || error?.message || 'Erro ao criar conta';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
 
       {/* Imagem decorativa esquerda */}
       <div className="flex-shrink-0 w-80 h-80 overflow-hidden mb-100 absolute mr-270 ">
                <img
                    src="/BolasY.png"
                    alt="Imagem decorativa"
                    className="w-full h-full object-contain"
                />
            </div>
 
      {/* Card de registro */}
      <Card className="bg-white w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Criar Conta</h1>
          <p className="text-dark/50">Cadastre-se na X2</p>
        </div>
 
       
 
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome completo"
            value={formData.name}
            onChange={handleInputChange("name")}
            placeholder="Seu nome completo"
            required
          />
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="seu@email.com"
            required
          />
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="sua senha"
            required
          />
                    <Input
            label="Confirme sua senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Confirme sua senha"
            required
          />
          <Input
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            placeholder="Digite seu telefone"
          />
 
          {/* userType removed from public registration (admins must be created securely) */}
         
          <Button type="submit" loading={loading} className="w-full">
            Criar Conta
          </Button>
        </form>
 
        {/* Link para login */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">Já possui conta?</p>
          <Link to="/login" className="text-light font-bold hover:text-dark">
            Faça login!
          </Link>
        </div>
      </Card>
            {/* Imagem decorativa esquerda */}
            <div className="flex-shrink-0 w-80 h-80 overflow-hidden mt-100 mb-30 absolute ml-270">
                <img
                    src="/BolasYR.png"
                    alt="Imagem decorativa"
                    className="w-full h-full object-contain"
                />
            </div>
    </div>
  );
};
 