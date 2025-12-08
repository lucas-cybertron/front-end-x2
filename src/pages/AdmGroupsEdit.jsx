// src/pages/AdmGroupsEdit.jsx
import { useState, useEffect, useContext } from "react";
import { Plus, Users, Trash2, Shuffle } from "lucide-react";
import { TeamsContext } from "../context/TeamsContext";

// Groups are client-side only for now (backend has no groups API).
// Persist groups to localStorage instead of the old mockApi.

const GROUPS_KEY = 'app_groups_v1';

const loadGroupsFromStorage = () => {
  try {
    const raw = localStorage.getItem(GROUPS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro lendo grupos do localStorage', e);
    return [];
  }
};

const saveGroupsToStorage = (groups) => {
  try {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  } catch (e) {
    console.error('Erro salvando grupos no localStorage', e);
  }
};

export const AdmGroupsEdit = () => {
  const { teams } = useContext(TeamsContext);

  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");

  // Carregar grupos ao montar o componente (a partir do localStorage)
  useEffect(() => {
    const stored = loadGroupsFromStorage();
    setGroups(Array.isArray(stored) ? stored : []);
  }, []);

  // ==== Funções com persistência ====
  const addGroup = () => {
    if (!newGroupName.trim()) return;

    const current = loadGroupsFromStorage();
    const nextId = current.length ? Math.max(...current.map((g) => g.id)) + 1 : 1;
    const newGroup = { id: nextId, name: newGroupName.trim(), teams: [] };
    const updated = [...current, newGroup];
    saveGroupsToStorage(updated);
    setGroups(updated);
    setNewGroupName("");
  };

  const removeGroup = (groupId) => {
    const current = loadGroupsFromStorage();
    const updated = current.filter((g) => g.id !== groupId);
    saveGroupsToStorage(updated);
    setGroups(updated);
  };

  const addTeamToGroup = (groupId, teamId) => {
    const team = teams.find((t) => t.id == teamId);
    if (!team) return;

    const current = loadGroupsFromStorage();
    const updated = current.map((g) =>
      g.id === groupId ? { ...g, teams: [...(g.teams || []), team] } : g
    );
    saveGroupsToStorage(updated);
    setGroups(updated);
  };

  const removeTeamFromGroup = (groupId, teamId) => {
    const current = loadGroupsFromStorage();
    const updated = current.map((g) =>
      g.id === groupId ? { ...g, teams: (g.teams || []).filter((t) => t.id !== teamId) } : g
    );
    saveGroupsToStorage(updated);
    setGroups(updated);
  };

  const distributeTeams = () => {
    if (groups.length === 0 || teams.length === 0) return;

    // 1. Copiar times
    const allTeams = [...teams];

    // 2. Criar grupos vazios
    const newGroups = groups.map((g) => ({ ...g, teams: [] }));

    // 3. Distribuir de forma circular
    let index = 0;
    for (let team of allTeams) {
      newGroups[index].teams.push(team);
      index = (index + 1) % newGroups.length;
    }

    // 4. Salvar no localStorage
    saveGroupsToStorage(newGroups);

    // 5. Atualizar estado React
    setGroups(newGroups);
  };

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-accent mb-6 border-b-2 border-accent pb-2">
        GRUPOS
      </h1>

      <div className="space-y-6">
        {/* Criar Grupo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Criar Novo Grupo</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nome do grupo"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addGroup()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light"
            />
            <button
              onClick={addGroup}
              className="px-4 py-2 cursor-pointer bg-accent text-white rounded-md hover:bg-llight flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Criar Grupo
            </button>
          </div>
        </div>
        {/* Botão Distribuir Times */}
            <div className="flex justify-end">
              <button
                onClick={distributeTeams}
                className="px-4 py-2 bg-accent text-white rounded-md flex items-center gap-2 hover:bg-light cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                Distribuir Times
              </button>
            </div>

        {/* Listagem dos Grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <button
                  onClick={() => removeGroup(group.id)}
                  className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {group.teams.length} equipes
                  </span>
                </div>

                {/* Times dentro do grupo */}
                <div className="space-y-2 mb-4">
                  {group.teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                    >
                      <span className="text-sm">{team.name}</span>
                      <button
                        onClick={() => removeTeamFromGroup(group.id, team.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Select para adicionar times */}
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addTeamToGroup(group.id, parseInt(e.target.value));
                      e.target.value = "";
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm "
                >
                  <option value="">Adicionar equipe...</option>
                  {teams
                    .filter(
                      (team) =>
                        !group.teams.find((t) => t.id === team.id)
                    )
                    .map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum grupo criado
            </h3>
            <p className="text-gray-500">
              Crie grupos para organizar as equipes
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
