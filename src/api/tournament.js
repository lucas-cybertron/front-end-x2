import client from './client';

export const drawBracket = (teamIds, seeded=false) =>
  client.post('/torneios/sorteio', { team_ids: teamIds, seeded }).then(r => r.data);

export const persistBracket = (tournamentName, teamIds, seeded=false) =>
  client.post('/torneios/sorteio/persist', { tournament_name: tournamentName, team_ids: teamIds, seeded }).then(r => r.data);

export const setMatchResult = (bracketId, scoreA, scoreB) =>
  client.put(`/torneios/chaveamentos/${bracketId}/resultado`, { team_a_score: scoreA, team_b_score: scoreB }).then(r => r.data);

export const advanceTournament = (name) =>
  client.post(`/torneios/chaveamentos/${name}/advance`).then(r => r.data);

export const listBrackets = (tournamentName) =>
  client.get('/torneios/chaveamentos', { params: { tournament_name: tournamentName } }).then(r => r.data);
