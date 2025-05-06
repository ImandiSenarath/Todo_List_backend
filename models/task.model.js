const pool = require('../config/database');

const Task = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY due_date ASC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  async create(task) {
    const { title, description, status, due_date } = task;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)',
      [title, description, status, due_date]
    );
    return this.getById(result.insertId);
  },

  async update(id, task) {
    const { title, description, status, due_date } = task;
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?',
      [title, description, status, due_date, id]
    );
    return this.getById(id);
  },

  async delete(id) {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return true;
  },

  async getByStatus(status) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE status = ? ORDER BY due_date ASC', [status]);
    return rows;
  }
};

module.exports = Task;