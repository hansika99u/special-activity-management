const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    role: {
        type: String,
        enum: ['ADMIN', 'VISITOR', 'ORGANIZER'],
        default: 'PENDING',
    },
});

const User = mongoose.model('User', UserSchema);

export default User;