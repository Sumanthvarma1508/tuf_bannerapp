const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chintu@123', // Replace with your actual MySQL password
    database: 'bannerdb',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from React app
}));
app.use(bodyParser.json());

// Routes
app.get('/api/banner', (req, res) => {
    db.query('SELECT * FROM banner WHERE id = 1', (err, result) => {
        if (err) {
            console.error('Error retrieving banner:', err);
            return res.status(500).send('Server error');
        }
        res.json(result[0]);
    });
});
 
  // Endpoint to update or insert banner data
  app.post('/api/banner', (req, res) => {
    const { description, timer, link, isVisible } = req.body;
    const sql = 'INSERT INTO banners (description, timer, link, isVisible) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE timer=?, link=?, isVisible=?';
    db.query(sql, [description, timer, link, isVisible, timer, link, isVisible], (err, result) => {
      if (err) throw err;
      res.send('Banner updated successfully');
    });
  });

app.get('/api/banner', (req, res) => {
    const description = req.query.description;
    const sql = 'SELECT * FROM banners WHERE description = ?';
    connection.query(sql, [description], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.post('/api/banner', (req, res) => {
    const { description, timer, link, isVisible } = req.body;
    db.query(
        'UPDATE banner SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = 1',
        [description, timer, link, isVisible],
        (err, result) => {
            if (err) {
                console.error('Error updating banner:', err);
                return res.status(500).send('Server error');
            }
            res.send('Banner updated');
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
