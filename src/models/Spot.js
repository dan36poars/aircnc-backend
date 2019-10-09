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
	return `http://${process.env.APP_URL}:${process.env.PORT}}/files/${this.thumbnail}`
});

module.exports = model('Spot', SpotSchema);