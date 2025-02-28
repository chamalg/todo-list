const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM task ORDER BY created_at DESC LIMIT 5');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks', err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Create
app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task', err);
    res.status(500).json({ message: 'Failed to add task' });
  }
});

// Delete
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task', err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Update
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const result = await db.query(
      'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  db.close();
  console.log('Database connection closed.');
  process.exit();
});
