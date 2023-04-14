import mongoose from 'mongoose';
const { Schema } = mongoose;

const specialActivitySchema = new Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            //[longitude,latitude]
        },
    },
    dateRange: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
    },
    timeRange: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    type: { type: Schema.Types.ObjectId, ref: 'ActivityType', required: true },
    description: { type: String },
    image: { type: String },
    status: {
        type: String,
        enum: ['APPROVED', 'DECLINED', 'PENDING'],
        default: 'PENDING',
    },
});

specialActivitySchema.index({ location: '2dsphere' });
specialActivitySchema.index({ name: 'text', description: 'text' });

const SpecialActivity = mongoose.model('SpecialActivity', specialActivitySchema);

export default SpecialActivity;
