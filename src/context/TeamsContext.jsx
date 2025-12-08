import { createContext, useState, useEffect } from "react";
import * as teamsApi from "../api/teams";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar times ao montar
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await teamsApi.listTeams();
        const mappedTeams = (data || []).map((team) => ({
          id: team.id,
          name: team.nome || team.name || "",
          escudo: team.escudo || null,
        }));
        setTeams(mappedTeams);
      } catch (error) {
        console.error("Erro ao carregar times:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const addTeam = async (teamName) => {
    try {
      const created = await teamsApi.createTeam({ nome: teamName, escudo: null });
      const t = { id: created.id, name: created.nome || created.name, escudo: created.escudo || null };
      setTeams((prev) => [...prev, t]);
      return t;
    } catch (err) {
      console.error('Erro ao criar time:', err);
      throw err;
    }
  };

  const removeTeam = async (teamId) => {
    try {
      await teamsApi.deleteTeam(teamId);
      setTeams((prev) => prev.filter((t) => t.id !== teamId));
    } catch (err) {
      console.error('Erro ao deletar time:', err);
      throw err;
    }
  };

  const updateTeam = async (teamId, updates) => {
    try {
      const updated = await teamsApi.updateTeam(teamId, { nome: updates.name, escudo: updates.escudo });
      setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, name: updated.nome || updated.name, escudo: updated.escudo || null } : t)));
    } catch (err) {
      console.error('Erro ao atualizar time:', err);
      throw err;
    }
  };

  return (
    <TeamsContext.Provider value={{ teams, loading, addTeam, removeTeam, updateTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};
