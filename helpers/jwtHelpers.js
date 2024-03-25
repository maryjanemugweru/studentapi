const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");

module.exports = {
    signAccessToken:(UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {UserId}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '10m',
                issuer: 'MJTechnologies.com',
                audience: UserId.toString(),
            }
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message)
                    reject(createHttpError.InternalServerError());
                }
                resolve(token);
            })
        })
    },

    verifyAccessToken:(req, res, next) => {
        if(!req.headers['authorization']) return next(createHttpError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                if(err.name === 'JsonWebTokenError') {
                    return next(createHttpError.Unauthorized())
                } else {
                    return next(createHttpError.Unauthorized(err.message))
                }
            }
        })
    },

    signRefreshToken:(UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const sectret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y',
                issuer: "MJTechnologies.com",
                audience: UserId.toString(),
            }
            JWT.sign(payload, secret, options, (error, token) => {
                if(error) {
                    console.log(error.message)
                    reject(createHttpError.InternalServerError())
                }
                resolve(token);
            })
        })
    },

    verifyRefreshToken:(refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) return reject(createHttpError.Unauthorized())
                const userId = payload.aud
            resolve(userId.toString())
            })
        })
    },
}