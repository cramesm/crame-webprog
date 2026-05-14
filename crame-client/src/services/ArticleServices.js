import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Fetch all articles
export const fetchArticles = () => API.get('/');

// Fetch single article by name
export const fetchArticleByName = (name) => API.get(`/${name}`);

// Create article
export const createArticle = (article) => API.post('/', article);

// Update article
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// Delete article
export const deleteArticle = (id) => API.delete(`/${id}`);
