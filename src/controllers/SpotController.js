const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const { tech: tecnology } = req.query;

		const spots = await Spot.find({ tecnology });
		return res.json( spots );
	},

    async store(req, res) {        
 
        const { filename: thumbnail } = req.file;
        const { company, price, techs: tecnology } = req.body;
        const { userid: user } = req.headers;

        const checkUser = await User.findById(user);

        if (!checkUser) {
        	return res.status(400).json({ error: "User don't exists."  });
        }

        const spot = await Spot.create({
            thumbnail,
            company,
            price,
            tecnology: tecnology.split(',').map(tech => tech.trim()),
            user
        });

        return res.json(spot);
    }
}