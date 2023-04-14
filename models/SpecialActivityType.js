const mongoose = require('mongoose');
const { Schema } = mongoose;

const activityTypeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
});

module.exports = mongoose.model('ActivityType', activityTypeSchema);

const SpecialActivityType = mongoose.model('ActivityType', activityTypeSchema);

export default SpecialActivityType;