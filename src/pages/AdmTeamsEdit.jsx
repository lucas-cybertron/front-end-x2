import { useState, useContext } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { TeamsContext } from "../context/TeamsContext";

export const AdmTeamsEdit = () => {
    const { teams, addTeam, removeTeam, updateTeam } = useContext(TeamsContext);
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamLogo, setNewTeamLogo] = useState("");


    const handleAddTeam = async () => {
        if (!newTeamName.trim()) return;

        try {
            // addTeam expects a team name (string) per TeamsContext API
            const created = await addTeam(newTeamName.trim());
            // if a logo/url was provided, call updateTeam to set escudo
            if (newTeamLogo && updateTeam && created && created.id) {
                await updateTeam(created.id, { name: created.name, escudo: newTeamLogo });
            }
        } catch (err) {
            console.error('Erro ao adicionar time:', err);
            // optionally show user feedback
        } finally {
            setNewTeamName("");
            setNewTeamLogo("");
        }
    };
    const handleRemoveTeam = (id) => {
        removeTeam(id);
    };

    return (
        <main className="flex-1 p-8">
            {/* Título */}
            <h1 className="text-3xl font-bold text-accent mb-6 border-b-2 border-accent pb-2">
                TIMES
            </h1>

            <p className="text-white text-sm mt-2 mb-6">
                <span className="font-semibold">Times</span><br />
                {teams.length} times cadastrados
            </p>

            <div className="space-y-8">
                {/* Criar novo time */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4">Novo time</h2>
                    <div className="flex gap-3">
                        <input
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/40"
                            placeholder="Nome do time"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTeam()}
                        />
                        <button
                            onClick={handleAddTeam}
                            className="cursor-pointer px-5 py-3 bg-accent text-white rounded-xl hover:bg-accent/80 flex items-center gap-2 transition font-medium"
                        >
                            <Plus size={18} />
                            Adicionar
                        </button>
                    </div>
                      {/* URL da logo */}
                        <input
                        className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/40"
                        placeholder="URL da logo (ex: https://meusite.com/logo.png)"
                        value={newTeamLogo}
                        onChange={(e) => setNewTeamLogo(e.target.value)}
                        />
                </div>

                {/* Lista de times */}
                <div className="bg-white rounded-2xl border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold">Times cadastrados</h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {teams.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-sm">
                                    Nenhum time cadastrado ainda
                                </p>
                            </div>
                        ) : (
                            teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                                >
                                    <span className="font-medium text-gray-900">
                                        {team.name}
                                    </span>

                                    <button
                                        onClick={() => handleRemoveTeam(team.id)}
                                        className="cursor-pointer text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
