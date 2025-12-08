import { useState } from "react";
import { Link,  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import toast from "react-hot-toast";

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login({ email: formData.email, password: formData.password });
            toast.success("Login realizado com sucesso!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center md:justify-between p-8">

            {/* Imagem decorativa esquerda (só no desktop) */}
            <div className="hidden md:flex flex-shrink-0 w-80 h-80 overflow-hidden mb-100">
                <img
                    src="/BolasY.png"
                    alt="Imagem decorativa"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Card de Login */}
            <div className="flex flex-col items-center justify-center w-full max-w-md mx-0 md:mx-12 my-8 md:my-0">
                <div className="bg-white shadow-lg w-full overflow-hidden rounded-2xl">

                    {/* Cabeçalho */}
                    <div className="h-24 relative flex items-center justify-center rounded-t-2xl">
                        <div className="absolute -bottom-14 w-34 h-34 rounded-full overflow-hidden">
                            <img
                                src="/LoginYicon.png"
                                alt="Foto do usuário"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="mt-16 px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="E-mail"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                placeholder="seu@email.com"
                                required
                            />
                            <Input
                                label="Senha"
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                placeholder="Sua senha"
                                required
                            />
                            <Button type="submit" loading={loading} className="w-full">
                                Entrar
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-dark/70">Não possui conta?</p>
                            <Link to="/register" className="text-light font-bold hover:text-dark">
                                Criar Conta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Imagem decorativa direita (só no desktop) */}
            <div className="hidden md:flex flex-shrink-0 w-80 h-80 overflow-hidden mt-120">
                <img
                    src="/BolasYR.png"
                    alt="Imagem decorativa"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};
