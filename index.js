import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import ActivityRoute from './routes/activityRoute.js';
import ReservationRoute from './routes/reservationRoute.js'
const app = express();

const CONNECTION_URL = 'mongodb+srv://admin-jmbp:pady1234@cluster0.9tchm.mongodb.net/itp?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/activities', ActivityRoute)
app.use('/reservations', ReservationRoute)




mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected")
        app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`));
