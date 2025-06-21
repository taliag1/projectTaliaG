const express = require('express');
const db = require('..//db');
const router = express.Router();

// רישום
router.post('/register', async (req, res) => {
  console.log(req.body)
  const { first_name, last_name, email, password } = req.body;

  const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, password], (err, result) => {
    if (err){
      console.log(err);
      return res.status(500).json({ error: 'שגיאה ביצירת משתמש' });
    }
    
    const Sql = 'SELECT * FROM users WHERE email = ?';

    db.query(Sql, [email], async (err, results) => {
      if (err || results.length === 0) return res.status(401).json({ error: 'משתמש לא נמצא' });

      const user = results[0];

      if (password==user.password) {
        console.log("Success Login in")
        res.json({ message: 'התחברת בהצלחה', userId: user.id });
        
      } else {
        res.status(401).json({ error: 'סיסמה שגויה' });
        console.error("failed Login in")

      }
    });


  });
});

// התחברות
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'משתמש לא נמצא' });

    const user = results[0];

    if (password==user.password) {
      console.log("Success Login in")
      res.json({ message: 'התחברת בהצלחה', userId: user.id });
      
    } else {
      res.status(401).json({ error: 'סיסמה שגויה' });
      console.error("failed Login in")

    }
  });
});

module.exports = router;
