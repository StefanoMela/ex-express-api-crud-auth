const express = require("express");
const postsRouter = require("./routers/posts");
const categoriesRouter = require('./routers/categories')
const tagsRouter = require('./routers/tags')
const authRouter = require('./routers/auth')
const app = express();
require("dotenv").config();

const cors = require("cors")

const {PORT} = process.env;
const port = PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter)

app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter)
app.use('/tags', tagsRouter)


app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});