const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const {
  BACK_URL,
} = require("../utils/toggleUrl.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACK_URL}/users/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

/* passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  return done(null, user.id);
}); */
