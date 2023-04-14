import mongoose from 'mongoose';
const { Schema } = mongoose;

const reservationSchema = new Schema({
    dateRange: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
    },
    timeRange: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    activity: { type: Schema.Types.ObjectId, ref: 'SpecialActivity', required: true },
});


const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
