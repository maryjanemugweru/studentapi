const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../model/regModel");

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
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    },

    verifyAccessToken:(req, res, next) => {
        if(!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                if(err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized())
                } else {
                    return next(createError.Unauthorized(err.message))
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
                    reject(createError.InternalServerError())
                }
                resolve(token);
            })
        })
    },

    verifyRefreshToken:(refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) return reject(createError.Unauthorized())
                const userId = payload.aud
            resolve(userId.toString())
            })
        })
    },
}