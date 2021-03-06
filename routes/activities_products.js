const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  connection.query('SELECT * from Activities_Products', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  connection.query('SELECT * from Activities_Products WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Internal server error' })
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({ message: 'Activities_Products ID not found' })
      )
    }
    res.json(results)
  });
});

module.exports = router;