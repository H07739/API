const query = require('../config/database');

async function AddComment(id_post,id_user,comment) {
    try {
        const sql = `INSERT INTO comment ( id_post, id_user,comment) VALUES (?,?,?);`;
        const results = await query(sql, [id_post,id_user,comment]);
        return results;
    }
    catch (error) {
        throw error;
    }

}

async function GetAllCommentsPostByID(id_post){
    try{
        const sql = `
        SELECT comment.*,
        users.id as id_user,
        users.name,
        users.username,
        users.image,
        users.documented,
        NOW() AS time_now
        FROM comment
        LEFT JOIN users ON users.id = comment.id_user
        WHERE comment.id_post = ?;`;
        const results = await query(sql, [id_post]);
        return results;
    }
    catch(error){
        throw error;
    }
}
module.exports={
    AddComment,
    GetAllCommentsPostByID
}