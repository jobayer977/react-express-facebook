const jwt = require('jsonwebtoken')
const SECRET_TOKEN = process.env.JWT_SECRET


module.exports = function (req,res,next) {
	// GET THE TOKEN FROM HEADER
	const getToken = req.header('x-auth-token')

	// CHECK IF NO TOKEN
	if (!getToken) {
		return res.status(401).json({msg:'No toke in Header'})
	}

	// VERIFY TOKEN
	try {
		const decoded = jwt.verify(getToken,SECRET_TOKEN)
		res.authToken = decoded
		next()
	} catch(e) {
		res.status(401).json({
			msg:'Invalid Token'
		})
	}
};