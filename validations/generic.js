const paramID = {
    id: {
        in: ['params'],
        isInt: {
            errorMessage: "L'ID deve essere un numero"
        },
    },
}

const slugCheck = {
    slug: {
        in: ['params'],
        isString: {
            errorMessage: 'Lo slug deve essere una stringa'
        }
    }
}

module.exports = {
    paramID,
    slugCheck
}