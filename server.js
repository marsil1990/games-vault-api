const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

// Only configure session store if MONGODB_URL is available
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "test-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

// Add MongoDB store only if MONGODB_URL is provided
if (process.env.MONGODB_URL) {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
  });
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

// Only configure OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const googleId = profile.id;
          const email = profile.emails && profile.emails[0].value;
          const name = profile.displayName;

          let user = await User.findOne({ googleId });
          if (!user) {
            user = await User.create({ googleId, email, name });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const u = await User.findById(id);
      done(null, u);
    } catch (err) {
      done(err, null);
    }
  });
}

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
});

//Detect Errors didn't catch for try catch
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// Only start server if not in test mode
if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      app.listen(process.env.PORT || 3000, () => {
        console.log(
          "Database is listening and node Running at port " +
            (process.env.PORT || 3000)
        );
      });
    })
    .catch((err) => {
      console.log("Error connecting Mongoose", err);
    });
}

module.exports = app;
