const express = require('express');
const { connection } = require('./Configs/db');
const { userRouter } = require('./Routers/UserRouter');
const { bookRouter } = require('./Routers/BookRouter');
require('dotenv').config();


const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);


app.listen(process.env.PORT, async () => {

    try {
        await connection
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log('error:', error)
    }

    console.log('listening on port 8080');
})