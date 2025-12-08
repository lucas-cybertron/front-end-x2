import client from './client';

export const listSponsors = (params) => client.get('/patrocinadores', { params }).then(r => r.data);
export const getSponsor = (id) => client.get(`/patrocinadores/${id}`).then(r => r.data);
export const createSponsor = (body) => client.post('/patrocinadores', body).then(r => r.data);
export const updateSponsor = (id, body) => client.put(`/patrocinadores/${id}`, body).then(r => r.data);
export const deleteSponsor = (id) => client.delete(`/patrocinadores/${id}`).then(r => r.data);
