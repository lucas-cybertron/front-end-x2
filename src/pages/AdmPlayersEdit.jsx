import { useState, useEffect, useContext } from "react";
import { Edit3, Save, X, ImagePlus, PlusCircle } from "lucide-react";
import client from "../api/client";
import { TeamsContext } from "../context/TeamsContext";
import { PlayerImage } from "../components/PlayerImage";

export const AdmPlayersEdit = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("az");
  const [players, setPlayers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);

  const { teams } = useContext(TeamsContext);

  const [newPlayer, setNewPlayer] = useState({
    nome: "",
    data_nascimento: "",
    time_nome: "",
    foto: null,
  });

  // Carregar jogadores ao montar o componente
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        // Fetch all times (each TimeResponse includes jogadores)
        const res = await client.get('/times');
        const times = res.data || [];
        // flatten jogadores from times and map to UI shape
        const mapped = [];
        for (const time of times) {
          const jgs = time.jogadores || [];
          for (const j of jgs) {
            mapped.push({
              id: j.id,
              nome: j.nome,
              data_nascimento: j.data_nascimento,
              time_id: time.id,
              time_nome: time.nome,
              nascimento: j.data_nascimento,
              foto: null,
            });
          }
        }
        setPlayers(mapped);
      } catch (error) {
        console.error("Erro ao carregar jogadores:", error);
      }
    };

    loadPlayers();
  }, [teams]);

  const handleChange = (id, field, value) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const savePlayerChanges = (id) => {
    const updatedPlayer = players.find(p => p.id === id);
    if (!updatedPlayer) return;
    (async () => {
      try {
        const team = teams.find((t) => t.name === updatedPlayer.time_nome);
        const payload = {
          nome: updatedPlayer.nome,
          data_nascimento: updatedPlayer.nascimento,
          time_id: team ? team.id : updatedPlayer.time_id,
        };
        await client.put(`/times/jogadores/${id}`, payload);
        // update local state
        setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedPlayer } : p)));
      } catch (err) {
        console.error('Erro ao salvar jogador:', err);
        alert('Erro ao salvar jogador');
      }
    })();
  };

  const handleImageUpload = (id, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPlayers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, foto: reader.result } : p))
      );
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleNewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setNewPlayer((prev) => ({ ...prev, foto: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const addPlayer = async () => {
    if (!newPlayer.nome || !newPlayer.data_nascimento || !newPlayer.time_nome) {
      alert("Preencha todos os campos!");
      return;
    }

    const selectedTeam = teams.find((t) => t.name === newPlayer.time_nome);
    if (!selectedTeam) {
      alert('Time inválido');
      return;
    }

    // quick auth check: ensure access token exists
    const access = localStorage.getItem('access_token');
    if (!access) {
      alert('Você precisa estar logado como administrador para criar jogadores.');
      return;
    }

    try {
      const payload = {
        nome: newPlayer.nome,
        data_nascimento: newPlayer.data_nascimento,
        time_id: selectedTeam.id,
      };
      console.log('Criando jogador payload:', payload, 'teamId=', selectedTeam.id);
      const res = await client.post(`/times/${selectedTeam.id}/jogadores`, payload);
      const created = res.data;
      const playerToAdd = {
        id: created.id,
        nome: created.nome,
        data_nascimento: created.data_nascimento,
        time_nome: selectedTeam.name,
        time_id: selectedTeam.id,
        nascimento: created.data_nascimento,
        foto: newPlayer.foto || null,
      };
      setPlayers((prev) => [...prev, playerToAdd]);
      setNewPlayer({ nome: "", data_nascimento: "", time_nome: "", foto: null });
      setAdding(false);
    } catch (err) {
      const resp = err?.response;
      let serverMsg = '';
      if (resp && resp.data) {
        try {
          serverMsg = typeof resp.data === 'string' ? resp.data : JSON.stringify(resp.data);
        } catch (err) {
          serverMsg = String(resp.data);
        }
      } else {
        serverMsg = err?.message || String(err);
      }
      console.error('Erro ao criar jogador:', err, resp && resp.data ? resp.data : null);
      alert('Erro ao criar jogador: ' + serverMsg);
    }
  };

  // FILTRAR
  const filtered = players.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  // ORDENAR
  const sorted = [...filtered].sort((a, b) => {
    if (order === "az") return a.nome.localeCompare(b.nome);
    else return b.nome.localeCompare(a.nome);
  });

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-accent mb-6 border-b-2 border-accent pb-2">
        JOGADORES
      </h1>

      {/* BOTÃO ADICIONAR */}
      <button
        className="flex items-center gap-2 cursor-pointer text-white bg-accent text-black font-bold px-4 py-2 rounded mb-4"
        onClick={() => setAdding(!adding)}
      >
        <PlusCircle size={20} /> Adicionar Jogador
      </button>

      {/* FORMULÁRIO ADICIONAR */}
      {adding && (
        <div className="bg-neutral-900 border border-neutral-700 p-4 text-white rounded-lg mb-6">
          <h2 className="text-xl mb-3 font-semibold">Novo Jogador</h2>

          <div className="flex gap-4 items-center">
            {/* Foto */}
            <div className="relative">
              <PlayerImage src={newPlayer.foto} alt="Novo jogador" />

              <label className="absolute bottom-0 right-0 bg-accent p-1 rounded cursor-pointer">
                <ImagePlus size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleNewImage(e.target.files[0])}
                />
              </label>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-3">
              <input
                className="p-2 rounded bg-black border border-neutral-700 text-white"
                placeholder="Nome"
                value={newPlayer.nome}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, nome: e.target.value })
                }
              />

              {/* DATA DE NASCIMENTO */}
              <input
                type="date"
                className="p-2 rounded bg-black border border-neutral-700 text-white"
                value={newPlayer.data_nascimento}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, data_nascimento: e.target.value })
                }
              />

              {/* TIME */}
              <select
                className="p-2 rounded bg-black border border-neutral-700 text-white"
                value={newPlayer.time_nome}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, time_nome: e.target.value })
                }
              >
                <option value="">Selecione o time</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="bg-green-600 px-4 cursor-pointer py-2 rounded text-white font-semibold"
              onClick={addPlayer}
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* PESQUISA */}
      <input
        type="text"
        placeholder="Pesquisar jogador..."
        className="w-full p-2 mb-3 rounded bg-neutral-900 text-white border border-neutral-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ORDENAR */}
      <select
        className="p-2 mb-4 rounded bg-black border border-neutral-700 text-white"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>

      {/* LISTA */}
      <div className="space-y-4">
        {sorted.map((player) => (
          <div
            key={player.id}
            className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 flex gap-4 items-center"
          >
            {/* FOTO */}
            <div className="relative">
              <PlayerImage src={player.foto} alt={player.nome} />

              <label className="absolute bottom-0 right-0 bg-accent p-1 rounded cursor-pointer">
                <ImagePlus size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageUpload(player.id, e.target.files[0])
                  }
                />
              </label>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-3">
              <input
                className="p-2 rounded bg-black border border-neutral-700 text-white"
                value={player.nome}
                disabled={editingId !== player.id}
                onChange={(e) =>
                  handleChange(player.id, "nome", e.target.value)
                }
              />

              {/* EDITAR DATA */}
              <input
                type="date"
                className="p-2 rounded bg-black border border-neutral-700 text-white"
                value={player.nascimento}
                disabled={editingId !== player.id}
                onChange={(e) =>
                  handleChange(player.id, "nascimento", e.target.value)
                }
              />

              <select
                className="p-2 rounded bg-black border border-neutral-700 text-white"
                value={player.time_nome}
                disabled={editingId !== player.id}
                onChange={(e) =>
                  handleChange(player.id, "time_nome", e.target.value)
                }
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* BOTÕES */}
            {editingId === player.id ? (
              <button
                className="bg-green-600 px-3 py-2 rounded text-white flex items-center gap-1"
                onClick={() => {
                  savePlayerChanges(player.id);
                  setEditingId(null);
                }}
              >
                <Save size={18} /> Salvar
              </button>
            ) : (
              <button
                className="bg-blue-600 px-3 py-2 cursor-pointer rounded text-white flex items-center gap-1"
                onClick={() => setEditingId(player.id)}
              >
                <Edit3 size={18} /> Editar
              </button>
            )}

            <button
              className="bg-red-600 px-3 py-2 cursor-pointer rounded text-white flex items-center gap-1"
              onClick={async () => {
                try {
                  await client.delete(`/times/jogadores/${player.id}`);
                  setPlayers((prev) => prev.filter((p) => p.id !== player.id));
                } catch (err) {
                  console.error('Erro ao deletar jogador:', err);
                  alert('Erro ao deletar jogador');
                }
              }}
            >
              <X size={18} /> Remover
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
