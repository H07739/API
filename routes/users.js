const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/User');




/**
 * @des Add User
 * @router /api/users
 * @method post 
 * @access public
 * 
 */

router.post('/', async (req, res) => {
    try {
        const { error } = validateCreateUser(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, email, password } = req.body;
        const results = await User.AddUser(name, User.generateRandomUsername(8), email, password);
        res.status(201).json({ message: 'تم إضافة المستخدم بنجاح', data: results });


    } catch (e) {
        res.status(400).json({ error: e.sqlMessage });
    }
});

/**
 * @des Login User
 * @router /api/users/login
 * @method put 
 * @param email and password
 * @access public
 * 
 */

router.post('/login', async (req, res) => {
    try {
        const { error } = validateLoginUser(req.body);
        if (error) {

            return res.status(406).json({ error: error.details[0].message });


        }
        const { email, password } = req.body;
        const results = await User.Login(email, password);
        if(results.length === 0){
            return res.status(405).json(results);
        }

        return res.status(200).json(results);

        
    }
    catch (e) {
        res.status(500).json({ error: e.sqlMessage });
    }
});





/**
 * @des Updata User
 * @router /api/users
 * @method put 
 * @access public
 * 
 */

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, username, password, mobleID, token_notification, country, image } = req.body;
        const { error } = validateUpdataUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        if (name) {
            const results = await User.UpdataUser(id, "name", name);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        if (username) {
            const results = await User.UpdataUser(id, "username", username);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        if (password) {
            const results = await User.UpdataUser(id, "password", password);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        if (mobleID) {
            const results = await User.UpdataUser(id, "mobleID", mobleID);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        if (token_notification) {
            const results = await User.UpdataUser(id, "token_notification", token_notification);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        if (country) {
            const results = await User.UpdataUser(id, "country", country);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        if (image) {
            const results = await User.UpdataUser(id, "image", image);
            return res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
        }

        res.status(400).json({ error: "يرجى ارسال البيانات" });



    }
    catch (er) {
        res.status(500).json({ error: er });
    }
});


function validateCreateUser(obj) {
    const user = Joi.object({
        name: Joi.string().trim().min(3).max(50).required(),
        //username: Joi.string().trim().min(4).max(30).required(),
        email: Joi.string().trim().min(3).max(200).email().required(),
        password: Joi.string().trim().min(6).max(18).required(),
    });


    return user.validate(obj);
}
function validateUpdataUser(obj) {
    const user = Joi.object({
        name: Joi.string().trim().min(3).max(50),
        username: Joi.string().trim().min(4).max(30),
        password: Joi.string().trim().min(6).max(18),
        mobleID: Joi.string().trim(),
        token_notification: Joi.string().trim(),
        country: Joi.string().trim(),
        image: Joi.string().trim(),
    });


    return user.validate(obj);
}

function validateLoginUser(obj) {
    const user = Joi.object({
        email: Joi.string().email().trim().min(3).max(200).email().required(),
        password: Joi.string().trim().min(6).max(18).required(),
    });


    return user.validate(obj);
}


module.exports = router;