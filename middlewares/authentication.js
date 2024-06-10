const RestError = require("../utils/restError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authProcedure = (req, res, next) => {
    const { authorization } = req.header;

    const token = authorization && authorization.split(" ")[1];

    if (!token) {
        throw new RestError("Token non valido", 403);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data)=> {
        if(err){
            throw new RestError("Token non valido", 403);
        }
        req.user = data;
        next();
    });
}
const isUserPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.id);

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        if (post.userId !== userId) { 
            return res.status(403).json({ message: "Puoi modificare solo i tuoi post" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    authProcedure,
    isUserPost
}