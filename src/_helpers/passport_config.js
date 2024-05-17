const passportJWT = require('passport-jwt');
const db = require('../_helpers/db');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log('payload received', jwt_payload);
    db.Account.findOne({where: { id: jwt_payload.userId}})
        .then(user => {
          if(user) {
            return done(null, user);
          }
          else{
            return done(null, false);
          }
        })
        .catch(err => done(err,null));
});


module.exports = (passport) =>{ 
  passport.use(strategy);
}