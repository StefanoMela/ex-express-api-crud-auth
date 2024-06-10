const express = require("express");
const postController = require('../controllers/posts');
const router = express.Router();

const authMdw = require('../middlewares/authentication');

const validator = require('../middlewares/validator');
const { bodyData } = require('../validations/posts')
const { slugCheck } = require('../validations/generic')

router.get('/', postController.index);

router.post('/', authMdw.authProcedure, validator(bodyData), postController.create);

router.get('/:slug', validator(slugCheck), postController.show);

router.put('/:slug', authMdw.authProcedure, authMdw.isUserPost, validator(bodyData), postController.update);

router.delete('/:slug', authMdw.authProcedure, authMdw.isUserPost, postController.destroy);


module.exports = router;