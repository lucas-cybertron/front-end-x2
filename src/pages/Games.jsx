// src/pages/Games.jsx
import { useState, useEffect, useContext } from "react";
import { TeamsContext } from "../context/TeamsContext";
import client from "../api/client";

export const Games = () => {
  const { teams } = useContext(TeamsContext);
  const [matches, setMatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados ao montar e recarregar periodicamente
  useEffect(() => {
    console.log("useEffect Games.jsx iniciado");

    const loadData = async () => {
      try {
        console.log("Carregando dados do backend...");
        const partidasRes = await client.get('/partidas');
        const tabelaRes = await client.get('/partidas/tabela/classificacao');

        const partidasData = partidasRes.data || [];
        const tabelaData = tabelaRes.data || [];

        // Mapear partidas para o formato esperado pela UI
        const mappedMatches = partidasData.map((m) => ({
          id: m.id,
          time1_id: m.time_mandante_id,
          time2_id: m.time_visitante_id,
          time1_nome: (teams.find((t) => t.id === m.time_mandante_id) || {}).name || '',
          time2_nome: (teams.find((t) => t.id === m.time_visitante_id) || {}).name || '',
          gols_time1: m.placar_mandante ?? 0,
          gols_time2: m.placar_visitante ?? 0,
          status: (m.placar_mandante != null || m.placar_visitante != null) && (m.placar_mandante !== 0 || m.placar_visitante !== 0) ? 'finalizado' : 'agendado',
        }));

        setMatches(mappedMatches);
        // backend may not provide 'grupo' — keep raw tabelaData and let UI handle absent fields
        setTable(tabelaData);
        // groups endpoint not available; keep empty array or implement if backend provides
        setGroups([]);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Recarregar dados a cada 2 segundos para sincronizar com AdmMatchesEdit
    const interval = setInterval(() => {
      console.log("Polling - recarregando dados");
      loadData();
    }, 2000);

    return () => {
      console.log("Limpando intervalo");
      clearInterval(interval);
    };
  }, [teams]);

  // Filtrar apenas partidas finalizadas
  const finishedMatches = matches.filter((m) => m.status === "finalizado");

  // Estado do jogo selecionado
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  // Card de jogo clicável
  const CardJogo = ({ time1_nome, gols_time1, gols_time2, time2_nome, onClick }) => (
    <div
      onClick={onClick}
      className="flex justify-between items-center bg-white rounded-xl shadow-md mb-2 p-3 cursor-pointer hover:bg-white/80 transition"
    >
      <span className="text-xs font-bold text-black bg-light px-2 py-1 rounded-md">
        FINALIZADO
      </span>
      <div className="flex-1 flex justify-center items-center text-gray-800 font-semibold">
        <span>{time1_nome || "—"}</span>
        <span className="mx-3 text-gray-800 font-bold">
          {gols_time1} x {gols_time2}
        </span>
        <span>{time2_nome || "—"}</span>
      </div>
      <span className="text-gray-400 text-lg">›</span>
    </div>
  );

  // Modal de detalhes do jogo
  const ModalJogo = ({ jogo, onClose }) => (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold text-dark-800 mb-4">Detalhes do Jogo</h2>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">{jogo.time1_nome}</span> {jogo.gols_time1} x {jogo.gols_time2}{" "}
          <span className="font-bold">{jogo.time2_nome}</span>
        </p>
        <p className="text-gray-500 text-sm mb-4">Status: Finalizado</p>
        <button
          onClick={onClose}
          className="bg-light text-white px-6 py-2 rounded-full cursor-pointer hover:bg-accent transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-dark flex items-center justify-center">
        <p className="text-white text-xl">Carregando chaveamento...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-dark flex flex-col items-center py-12 px-4 relative overflow-hidden">
      
      {/* Bolas decorativas */}
      <img
        src="/BolasY.png"
        alt="Bola topo esquerdo grande"
        className="absolute top-0 left-0 w-1/4 md:w-1/6 "
      />
      <img
        src="/BolasYR.png"
        alt="Bola topo direito grande"
        className="absolute top-0 right-0 w-1/4 md:w-1/6 "
      />
      <img
        src="/BolasY.png"
        alt="Bola inferior esquerda"
        className="absolute bottom-0 left-0 w-1/4 md:w-1/6 "
      />
      <img
        src="/BolasYR.png"
        alt="Bola inferior direita"
        className="absolute bottom-0 right-0 w-1/4 md:w-1/6"
      />

      {/* Título */}
      <h1 className="text-2xl font-extrabold text-white text-center">
        PARTIDAS FINALIZADAS
      </h1>
      <h2 className="text-lg font-bold text-white mb-8 text-center">
        RESULTADOS
      </h2>

      {/* Partidas Finalizadas */}
      <div className="relative z-10 w-full max-w-3xl bg-white/75 rounded-2xl shadow-lg p-6 mb-10 backdrop-blur-sm">
        {finishedMatches.length === 0 ? (
          <p className="text-gray-600 text-center py-6">Nenhuma partida finalizada ainda</p>
        ) : (
          finishedMatches.map((jogo) => (
            <CardJogo
              key={jogo.id}
              time1_nome={jogo.time1_nome}
              gols_time1={jogo.gols_time1}
              gols_time2={jogo.gols_time2}
              time2_nome={jogo.time2_nome}
              onClick={() => setJogoSelecionado(jogo)}
            />
          ))
        )}
      </div>


      {/* Modal */}
      {jogoSelecionado && (
        <ModalJogo
          jogo={jogoSelecionado}
          onClose={() => setJogoSelecionado(null)}
        />
      )}
    </div>
  );
};
