const express = require("express");
const postController = require('../controllers/posts');
const router = express.Router();

const authMdw = require('../middlewares/authentication');

const validator = require('../middlewares/validator');
const { bodyData } = require('../validations/posts')
const { slugCheck } = require('../validations/generic')


const multer = require('multer');
const uploader = multer({dest: "./public/imgs"});

router.get('/', postController.index);

router.post('/', uploader.single("image"), validator(bodyData), postController.create);

router.get('/:slug', validator(slugCheck), postController.show);

router.put('/:slug', authMdw.authProcedure, authMdw.isUserPost, validator(bodyData), postController.update);

router.delete('/:id', postController.destroy);


module.exports = router;