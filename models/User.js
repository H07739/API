const query = require('../config/database');



async function AddUser(name, username, email, password) {
    try {
        const sql = `INSERT INTO users (name,username,email,password) VALUES (?,?,?,?);`;
        const results = await query(sql, [name, username, email, password]);

        const selectSql = `SELECT * FROM users WHERE id = ?;`;
        const selectResults = await query(selectSql, [results.insertId]);
        return selectResults;
    }
    catch (error) {
        throw error;
    }

}

async function UpdataUser(id,coulm,data) {
    try {
        const sql = `UPDATE users SET ${coulm} = ? WHERE id = ?;`;
        const results = await query(sql, [data,id]);
        return results;
    }
    catch (error) {
        throw error;
    }

}

function generateRandomUsername(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomUsername = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomUsername += characters.charAt(randomIndex);
    }
  
    return randomUsername;
  }


  async function Login(email,password) {
    try {
        const sql = `SELECT * FROM users WHERE email =? and password =?`;
        const results = await query(sql, [email,password]);
        return results;
    }
    catch (error) {
        throw error;
    }

}

module.exports = {
    AddUser,
    UpdataUser,
    generateRandomUsername,
    Login
}