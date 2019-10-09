const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: {
    	type: String,
    	required: true
    }
});

module.exports = model('User', UserSchema);