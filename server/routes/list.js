const express = require('express');
const db = require('../db');
const router = express.Router();

// קבלת פריטים לפי משתמש
router.get('/:userId', (req, res) => {
  const sql = 'SELECT * FROM list_items WHERE user_id = ?';
  db.query(sql, [req.params.userId], (err, results) => {
    if (err)
    {
      console.error('Error fetching items:', err);
      return res.status(500).json({ error: 'שגיאה בשליפה' });
    } 
    res.json(results);
  });
});

// הוספה
router.post('/', (req, res) => {
  const { text, user_id } = req.body;
  const sql = 'INSERT INTO list_items (text, user_id) VALUES (?, ?)';
  db.query(sql, [text, user_id], (err, result) => {
    if (err) 
    {
      console.error('Error adding item:', err);
      return res.status(500).json({ error: 'שגיאה בהוספה' });
    }
    res.json({ message: 'נוסף בהצלחה', id: result.insertId });
  });
});

// עריכה
router.put('/:id', (req, res) => {
  const { text } = req.body;
  const sql = 'UPDATE list_items SET text = ? WHERE id = ?';
  db.query(sql, [text, req.params.id], (err) => {
    if (err) 
    {
      return res.status(500).json({ error: 'שגיאה בעדכון' });
    }
    res.json({ message: 'עודכן בהצלחה' });
  });
});

// מחיקה
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM list_items WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err)
    {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'שגיאה במחיקה' });
    } 
    res.json({ message: 'נמחק בהצלחה' });
  });
});

module.exports = router;
