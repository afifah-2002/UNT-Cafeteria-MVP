require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');

const cafeRoutes = require('./routes/cafeRoutes');
const loginRoutes = require('./routes/loginRoutes.js');

//Stripe
const stripeRoutes = require('./routes/stripeRoutes');
const webhookRoutes = require('./routes/webhookRoutes.js');


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', cafeRoutes);
app.use('/api', loginRoutes);
app.use('/stripe', stripeRoutes);
app.use('/stripe/webhook', webhookRoutes);


app.get('/', (req, res) => {
    res.send('UNT Cafe API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});