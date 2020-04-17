const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt } = require('passport-jwt')

const User = require('./models/user')

passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : 'remahAmr'    
},async (payload,done) => {
    try{
        // Check if user exists 
        const user = await User.findById(payload.user_id)
        // if user doesn't exist
        if(!user) {return done(null,false)}
        // successful , return user
        done(null,user) // put user in : req.user
    } catch(err){
        done(err,false)
    }
}))