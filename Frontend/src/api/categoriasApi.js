import base from './base.js'

const endpoint = 'categorias';

const findAll = async () => await base.get(endpoint);
const create = async (payload) => await base.post(endpoint, payload);
const update = async (id, payload) => await base.put(`${endpoint}/${id}`, payload);
const remove = async (id) => await base.remove(`${endpoint}/${id}`);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);
const findByName = async (name) => await base.get(`${endpoint}/buscar/${name}`);

const categoriasApi = { findAll, create, update, remove, findOne, findByName };

export default categoriasApi;

