const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET nombre y apellido de autores con publicaciones inferiores o igual a 20.
 */
 router.get('/consulta1', async (req, res) => {
  try {
    let filters = {};
    filters = { publicados: { $lte: 20 } };
    const authorsData = await Author.find(filters);
    const authors = authorsData.map((autor) => ({nombre: autor.nombre, apellido: autor.apellido}))
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET nombre de autores con apellido.
 */
 router.get('/consulta2', async (req, res) => {
  try {
    let filters = {};
    filters = { apellido: {$exists: true} };
    const authorsData = await Author.find(filters);
    const authors = authorsData.map((autor) => ({nombre: autor.nombre}))
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET apellido de autores con mas de 20 puclicaciones o de argentina.
 */
 router.get('/consulta3', async (req, res) => {
  try {
    let filters = {};
    filters = { $or: [{ publicados: { $gt: 20 } }, { pais: { $eq: 'Argentina' } }] };
    const authorsData = await Author.find(filters);
    const authors = authorsData.map((autor) => ({apellido: autor.apellido}))
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
