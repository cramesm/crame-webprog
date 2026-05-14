const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/:name', getArticleByName);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
