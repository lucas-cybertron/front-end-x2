// src/pages/Contact.jsx
import { useState } from "react";

export const Contact = () => {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Enviar contact:", form);
    alert("Mensagem enviada (teste).");

    setForm({ nome: "", email: "", mensagem: "" });
  };

  return (
    <div className="min-h-screen bg-black px-6 py-16 flex justify-center items-start">
      {/* CARD BRANCO */}
      <div className="w-full max-w-lg bg-white text-black p-8 rounded-2xl border border-gray-300 shadow-xl">

        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-accent">
          Contato
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nome */}
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Seu nome
            </label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/40 outline-none transition"
              placeholder="Digite seu nome"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/40 outline-none transition"
              placeholder="Seu email"
              required
            />
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Mensagem
            </label>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/40 outline-none transition"
              placeholder="Digite sua mensagem"
              required
            ></textarea>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-accent text-white cursor-pointer font-bold py-3 rounded-xl shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
          >
            Enviar mensagem
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
