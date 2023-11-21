import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/User';
import bcrypt from 'bcrypt';

const LocalStretagy = passportLocal.Strategy;

passport.use(new LocalStretagy({
    usernameField:'email'
},
    async (email,password,done) => {
        try {
            const user = await User.findOne({email}).populate('country');
            if (!user) {
                return done(null,false);
            }
            const match = await bcrypt.compare(password,user.password);
            if (!match) {
                return done(null,false);
            }
            console.log(user)
            return done(null,user);
        } catch (err) {
            return done(err);
        }
    }
))

passport.serializeUser((user,done) => {
    return done(null,user._id);
})

passport.deserializeUser((id,done) => {
    const callNow = async () => {
        try {
            const user = await User.findById(id)
            return done(null,user)
        } catch (err) {
            return done(err)
        }
    }
    callNow();
})

export default passport;