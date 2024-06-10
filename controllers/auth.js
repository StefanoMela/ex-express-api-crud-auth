const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateToken = require('../utils/generateToken'); // recupero funzione per generare token
const { hashPassword, comparePassword } = require("../utils/password.js"); // recupero funzioni hashing e controllo
const deleteProfilePic = require("../utils/deleteProfilePic.js");
const errorHandler = require("../middlewares/errorHandler.js");
require('dotenv').config();

const register = async (req, res) => {
    try {

        // destrutturo i campi che mi arriveranno
        const { name, lastName, email, password } = req.body;

        // creo l'oggetto User e hasho la password
        const data = {
            name,
            lastName,
            email,
            password: await hashPassword(password),
        }

        // controllo se c'è un file allegato e creo il path di salvataggio
        if (req.file) {
            data.img_path = `${HOST}:${port}/profile_pics/${req.file.filename}`;
        }

        // istanzio User e lo riempio con i data precedenti
        const user = await prisma.user.create({ data });

        // creo il token univoco
        const token = generateToken({
            email: user.email,
            name: user.name
        });

        delete user.id;
        delete user.password;

        // restituisco json del token e dello user
        res.json({ token, data: user });

    } catch (err) {
        if (req.file) {
            deleteProfilePic(req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        // recupero user via email
        const user = await prisma.user.findUnique({
            where: {email}
        });
        // errore nel caso in cui l'utente non sia trovato
        if(!user){
            new Error('User non trovato');
        }

        // check se PWD è valida
        const isPwdValid = await comparePassword(password, user.password);
        if(!isPwdValid){
           throw new Error('Username o Password non Validi');
        }

        // genero il token
        const token = generateToken({
            email: user.email,
            name: user.name
        });

        delete user.id;
        delete user.password;

        console.log(user);
        res.json({token, data: user});

    } catch (err) {
       errorHandler(err, req, res);
    }
}


module.exports = {
    register,
    login
}