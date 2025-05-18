require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cafeRoutes = require('./routes/cafeRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use('/api', cafeRoutes);


app.get('/', (req, res) => {
    res.send('UNT Cafe API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});