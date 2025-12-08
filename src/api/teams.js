import client from './client';

export const listTeams = (params) => client.get('/times', { params }).then(r => r.data);
export const getTeam = (id) => client.get(`/times/${id}`).then(r => r.data);
export const createTeam = (team) => client.post('/times', team).then(r => r.data);
export const updateTeam = (id, team) => client.put(`/times/${id}`, team).then(r => r.data);
export const deleteTeam = (id) => client.delete(`/times/${id}`).then(r => r.data);
