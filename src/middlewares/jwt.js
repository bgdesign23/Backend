const jwt = require('jsonwebtoken')

const signToken = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if(err) return reject(err);
            resolve(token)
        })
    })
}

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(err) return reject(err)
            resolve(decoded)
        })
    })
}

module.exports = { signToken, verifyToken }