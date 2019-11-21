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
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
})

const usersRouter = require('./routes/users');
const summariesRouter = require('./routes/summaries');

app.use('/users', usersRouter);
app.use('/summaries', summariesRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}); 