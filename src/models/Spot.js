const { model, Schema } = require('mongoose');

const SpotSchema = new Schema({
    thumbnail: String,
    company: String,
    price: Number,
    tecnology: [String],
    user: {
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    }
}, {
	toJSON: {
		virtuals: true,
	},
});

SpotSchema.virtual('thumbnail_url').get(function () {
	return `http://192.168.0.3:3333/files/${this.thumbnail}`
});

module.exports = model('Spot', SpotSchema);