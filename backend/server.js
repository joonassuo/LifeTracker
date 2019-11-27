const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

//if connection to mongo fails, add 'error', else:
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
})

const usersRouter = require('./routes/users');
const summariesRouter = require('./routes/summaries');
const userSessionRouter = require('./routes/usersession');

app.use('/users', usersRouter);
app.use('/summaries', summariesRouter);
app.use('/usersession', userSessionRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});