const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

const joi = require('joi');



/**
 * @description Add Post Only User
 * @returns /api/posts
 * @method post
 * @access public
 */

router.post('/', async (req, res) => {
    try {
        const { error } = validateCreatePost(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {id_user,imageURL,title}=req.body;

        const results = await Post.AddPost(id_user,imageURL,title);
        res.status(200).json({ message: 'تم إضافة المنشور بنجاح', data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }
    
    

});

/**
 * @description Updata Post by id
 * @param id and id_user and image or title 
 * @returns /api/posts
 * @method put
 */

router.put('/:id', async (req, res) => {
    try {
        const { error } = validateUpdataPost(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id_user, title, imageURL } = req.body;
        const results = await Post.update(req.params.id, { title, imageURL });
        
        res.status(200).json({ message: 'تم تعديل المنشور بنجاح', data: results });
    } catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }
});


/**
 * @description Get Post by id
 * @param id 
 * @returns /api/posts/:id
 * @method get
 */

router.get('/:id',async(req,res)=>{
    try{
        const results = await Post.findById(req.params.id);
        res.status(200).json({data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }

});


/**
 * @description Get Post All
 * @param id 
 * @returns /api/posts/all
 * @method get
 */

router.get('/all/:id',async(req,res)=>{
    try{
        
        const results = await Post.AllPost(req.params.id);
        res.status(200).json({data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }

});


/**
 * @description Add Like
 * @param id_user and id_post 
 * @returns /api/posts/like
 * @method post
 */

router.post('/like',async(req,res)=>{
    try{
        const { error } = validateAddLikedPost(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { id_user, id_post } = req.body;
        const results = await Post.AddLike(id_user,id_post);
        res.status(200).json({data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }

});

/**
 * @description Delete Like
 * @param id_user and id_post 
 * @returns /api/posts/like
 * @method delete
 */

router.delete('/like',async(req,res)=>{
    try{
        const { error } = validateDeleteLikedPost(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { id_user, id_post } = req.body;
        const results = await Post.DeleteLike(id_user,id_post);
        res.status(200).json({data: results });
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }

});


function validateCreatePost(obj) {
    const schema = joi.object({
        id_user: joi.number().min(1).required(),
        imageURL: joi.string().uri(),
        title: joi.string().min(3).max(300)
    }).or('imageURL', 'title');

    return schema.validate(obj);
}

function validateUpdataPost(obj) {
    const schema = joi.object({
        id_user: joi.number().min(1).required(),
        imageURL: joi.string().uri(),
        title: joi.string().min(3).max(300)
    }).or('imageURL', 'title');

    return schema.validate(obj);
}

function validateAddLikedPost(obj) {
    const schema = joi.object({
        id_user: joi.number().min(1).required(),
        id_post: joi.number().min(1).required(),
    });

    return schema.validate(obj);
}

function validateDeleteLikedPost(obj) {
    const schema = joi.object({
        id_user: joi.number().min(1).required(),
        id_post: joi.number().min(1).required(),
    });

    return schema.validate(obj);
}




module.exports = router;