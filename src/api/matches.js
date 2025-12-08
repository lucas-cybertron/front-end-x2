import client from './client';

export const listMatches = (params) => client.get('/partidas', { params }).then(r => r.data);
export const getMatch = (id) => client.get(`/partidas/${id}`).then(r => r.data);
export const createMatch = (body) => client.post('/partidas', body).then(r => r.data);
export const updateMatch = (id, body) => client.put(`/partidas/${id}`, body).then(r => r.data);
export const deleteMatch = (id) => client.delete(`/partidas/${id}`).then(r => r.data);

export const getTabela = () => client.get('/partidas/tabela/classificacao').then(r => r.data);
export const getPosicao = (timeId) => client.get(`/partidas/tabela/time/${timeId}`).then(r => r.data);
