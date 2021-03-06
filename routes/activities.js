const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  connection.query('SELECT * from Activities', (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: 'There are no activities...'})
      )
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const activityId = parseInt(req.params.id);
  connection.query('SELECT * from Activities WHERE id = ?', activityId, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: 'Internal server error'})
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({message: 'Activities ID not found'})
      )
    }
    res.json(results)
  });
});

router.put('/:id', (req, res) => {
  const idActivity = parseInt(req.params.id);
  const formData = req.body;
  connection.query('UPDATE Activities SET ? WHERE id = ?', [formData, idActivity], (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: "Internal server error"})
      )
    } 
    if (results.changedRows === 0) {
      return (
        res.status(404).json({message: 'User ID not found'})
      )
    }
    res.status(200).json({message: `Changed row ${results.changedRows}`});
  });
});

router.post('/', (req, res) => {
  const formData = req.body;
  if (formData.title == "" || formData.title == null) {
    return (
      res.status(400).json({message: "Necessary fields are empty"})
    )
  }
  connection.query('INSERT INTO Activities SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: "Internal server error"})
      )
    } else {
      return (
        res.status(201).json({ ...formData, id: results.insertId })
      )
    }
  });
});

router.delete('/:id', (req, res) => {
  const idActivities = req.params.id

  connection.query('DELETE FROM Activities WHERE id = ?', [idActivities], err => {
    if (err) {
      return (
        res.status(500).json({message: "Internal server error"})
      )
      } else {
        res.sendStatus(200);
      }  
  });
});

module.exports = router;
