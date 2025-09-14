import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";



passport.use(
  
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // 1. Find by googleId
        let user = await User.findOne({ googleId: profile.id });

        // 2. If not, find by email (merge account)
        if (!user && profile.emails?.length) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        // 3. If still not, create new user
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            role: "user",
          });
        }

        return done(null, user);
      } catch (err) {
        done(err as Error, false);
      }
    }
  )
);

export default passport;
