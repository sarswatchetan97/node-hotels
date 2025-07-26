const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')

passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
  //authentication logic here
  try{
    console.log('Received Credentials: ', USERNAME, PASSWORD);
    const user = await Person.findOne({username: USERNAME});
    if(!user) {
      return done(null, false, {message:'Incorrect username'})
    }

    //const isPasswordMatch = user.password === PASSWORD ? true : false; //this logic will work with plain password

    const isPasswordMatch = await user.comparePassword(PASSWORD);

    if(isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Password Incorrect'})
    }
  } catch(error) {
    done(error);
  }
}));

module.exports = passport;