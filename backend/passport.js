const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/user.model')

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        User.findById(jwt_payload._id).then((user)=>{
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))

}