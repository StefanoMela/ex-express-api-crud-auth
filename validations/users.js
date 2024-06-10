const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerData = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email è obbligatoria",
            bail: true,
        },
        isEmail: {
            errorMessage: 'Email deve essere una mail valida',
            bail: true
        },
        custom: {

            // controllo se l'email è già presente nel DB
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });
                if (user) {
                    throw new Error(`User associato a questa email già presente.`);
                }
                return true;
            }
        }
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: 'Il nome deve essere una stringa.',
            bail: true
        },
        isLength: {
            errorMessage: 'Il nome deve essere di almeno 4 caratteri',
            options: { min: 4 }
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
            bail: true
        },
        isLength: {
            errorMessage: 'Password deve essere di almeno 8 caratteri',
            options: { min: 8 }
        }
    }
}

const loginData = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email è un campo obbligatorio.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email deve essere una mail valida',
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
        }
    }
}

module.exports = {
    registerData,
    loginData
}