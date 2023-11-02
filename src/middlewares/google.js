const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
// const url = process.env.BASE_URL || "http://localhost:3001";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://backend-muebles.vercel.app/users/google/callback",
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
