const Article = require('../models/Article');

// @desc    Fetch all articles
// @route   GET /api/articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single article by name (slug)
// @route   GET /api/articles/:name
exports.getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new article
// @route   POST /api/articles
exports.createArticle = async (req, res) => {
  const { name, title, content, author } = req.body;
  try {
    const newArticle = new Article({ name, title, content, author });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update article
// @route   PUT /api/articles/:id
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete article
// @route   DELETE /api/articles/:id
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
