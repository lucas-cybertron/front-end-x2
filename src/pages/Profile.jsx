import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ImagePlus } from "lucide-react"
import toast from "react-hot-toast";

export const Profile = () => {
  const { user, login } = useAuth(); // login usado para atualizar dados no contexto
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    type: user?.type || "",
  });
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        type: user.type || "",
      });
    }
  }, [user]);

  // 🔹 Atualizar imagem de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
      toast.success("Foto de perfil atualizada!");
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Salvar alterações
  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    // Atualiza contexto + localStorage
    login(updatedUser, localStorage.getItem("token"));
    localStorage.setItem("lunysse_user", JSON.stringify(updatedUser));

    toast.success("Perfil atualizado com sucesso!");
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-green-0 text-black p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Meu Perfil
        </h1>

        {/* 🔹 Foto de perfil */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent shadow-md">
            {profileImage ? (
              <img src={profileImage} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <img src="/LoginYicon.png" alt="Usuário padrão" className="w-full h-full object-cover opacity-80" />
            )}
          </div>

          <div className="bg-light rounded-2xl items-center text-center hover:bg-accent transition cursor-pointer p-1 mt-1.5">
            <label className="flex  text-sm justify-center gap-2  text-white font-semibold m-1 cursor-pointer">
              Alterar foto
              <div className="pl-1 ">
                <ImagePlus size={20}/>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

        </div>

        {/* 🔹 Informações do usuário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Nome:</label>
            {editing ? (
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <p className="bg-gray-100 rounded-lg p-2">{user?.name}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-bold mb-1">E-mail:</label>
            {editing ? (
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            ) : (
              <p className="bg-gray-100 rounded-lg p-2">{user?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Tipo de conta:</label>
            <p className="bg-gray-100 rounded-lg p-2 capitalize">
              {(user?.type || '').toString().toLowerCase() === 'admin'
                ? 'Usuário ADMIN'
                : 'Usuário comum'}
            </p>

          </div>
        </div>

        {/* 🔹 Botões */}
        <div className="mt-6 flex flex-col gap-3">
          {!editing ? (
            <Button onClick={() => setEditing(true)} className="w-full">
              Editar perfil
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} className="w-full">
                Salvar alterações
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    type: user?.type || "",
                  });
                }}
                className="w-full cursor-pointer"
              >
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
