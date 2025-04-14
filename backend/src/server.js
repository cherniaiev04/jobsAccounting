const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express()


app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:8080', // or your frontend URL
        credentials: true               // ✅ must be true for cookies to work
    })
);

// Роуты
app.use('/api/orders', orderRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, function () {
    console.log('Listening on port 5001:5000');
});