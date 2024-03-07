const query = require('../config/database');

async function AddPost(id_user, imageURL, title) {
    try {
        const sql = `INSERT INTO posts (id_user,image,title) VALUES (?,?,?);`;
        const results = await query(sql, [id_user, imageURL, title]);

        const selectSql = `SELECT * FROM posts WHERE id = ?;`;
        const selectResults = await query(selectSql, [results.insertId]);
        return selectResults;
    }
    catch (error) {
        throw error;
    }

}

async function update(id, dataToUpdate) {
    try {
        const { title, imageURL, time } = dataToUpdate;

        // استعلام لاسترجاع القيم الحالية
        const currentDataSql = `SELECT title, image, time FROM posts WHERE id = ?;`;
        const currentDataResults = await query(currentDataSql, [id]);
        const currentTitle = currentDataResults[0].title;
        const currentImageURL = currentDataResults[0].image;
        const createdAt = currentDataResults[0].time;

        // فحص إذا كانت القيمة قيد التحديث
        const updatedTitle = title !== undefined ? title : currentTitle;
        const updatedImageURL = imageURL !== undefined ? imageURL : currentImageURL;
        const updatedTime = time !== undefined ? time : createdAt;

        // تحديث البيانات
        const sql = `UPDATE posts SET title = ?, image = ?, time = ? WHERE id = ?;`;
        const results = await query(sql, [updatedTitle, updatedImageURL, updatedTime, id]);

        // استعلام لاسترجاع البيانات بعد التحديث
        const selectSql = `SELECT * FROM posts WHERE id = ?;`;
        const selectResults = await query(selectSql, [id]);
        return selectResults;
    } catch (error) {
        throw error;
    }
}

async function findById(id) {
    try {
        const sql = `SELECT posts.*, users.name, users.username, users.image as imageuser
        FROM posts
        INNER JOIN users ON posts.id_user = users.id
        WHERE posts.id = ?;
        `;
        const results = await query(sql, [id]);

        return results;
    }
    catch (error) {
        throw error;
    }

}

async function AllPost(id) {
    try {
        const sql = `SELECT
        posts.*,
        users.name,
        users.username,
        users.image AS imageuser,
        users.documented,
        (SELECT COUNT(id_post) FROM share WHERE share.id_post = posts.id) AS Number_share,
        (SELECT COUNT(id_post) FROM comment WHERE comment.id_post = posts.id) AS Number_comment,
        (SELECT COUNT(id_post) FROM likes WHERE likes.id_post = posts.id) AS Number_Likes,
        CASE WHEN EXISTS (SELECT 1 FROM likes WHERE likes.id_post = posts.id AND likes.id_user = ?) THEN 'yes' ELSE 'no' END AS is_likes,
        NOW() AS time_now
    FROM
        posts
    INNER JOIN
        users ON posts.id_user = users.id
        GROUP BY Posts.id
            ORDER BY Posts.id DESC;
    `;
        const results = await query(sql,[id]);

        return results;
    }
    catch (error) {
        throw error;
    }

}

async function AddLike(id_user,id_post) {
    try {
        const sql = `
        SELECT 1 FROM likes WHERE likes.id_post = ? AND likes.id_user = ?
        `;
        const result = await query(sql, [id_post,id_user]);
        if(result[0]){
            return result;
        }
        const sql2=`INSERT INTO likes (id_user, id_post) VALUES (?, ?);`
        const result2 = await query(sql2, [id_user,id_post]);
        return result2;
    }
    catch (error) {
        throw error;
    }

}

async function DeleteLike(id_user,id_post) {
    try {
        const sql = `
        SELECT 1 FROM likes WHERE likes.id_post = ? AND likes.id_user = ?
        `;
        const result = await query(sql, [id_post,id_user]);
        if(result[0]){
            const sql2=`DELETE FROM likes WHERE id_user=? and id_post=?;`
            const result2 = await query(sql2, [id_user,id_post]);
            return result2;
        }
        
        return result;
    }
    catch (error) {
        throw error;
    }

}


module.exports = {
    AddPost,
    update,
    findById,
    AllPost,
    AddLike,
    DeleteLike
}