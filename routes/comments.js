const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment')

const joi = require('joi');

/**
 * @description Add Comment
 * @param id_user and id_post and comment
 * @returns /api/comments
 * @method post
 */

router.post('/', async (req, res) => {
    try {
        const { error } = validateAddCommentPost(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        const { id_user, id_post, comment } = req.body;
        const results = await Comment.AddComment(id_post, id_user, comment);
        res.status(200).json({ data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }
});

/**
 * @description Get all post Comment
 * @param id_post
 * @returns /api/comments/:id
 * @method post
 */

router.get('/:id', async (req, res) => {
    try {
        const results = await Comment.GetAllCommentsPostByID(req.params.id);
        res.status(200).json({ data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }
});

function validateAddCommentPost(obj) {
    const schema = joi.object({
        id_user: joi.number().min(1).required(),
        id_post: joi.number().min(1).required(),
        comment: joi.string().min(1).max(150).required()
    });

    return schema.validate(obj);
}



module.exports = router;