import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../dao/mongo/models/user.model.js";
import { config } from "./config.js";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["jwtCookie"];
  }

  return token;
};

export const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.secret
      },
      async (jwt_payload, done) => {
        try {
          const user = await UserModel.findById(jwt_payload.id).lean();

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};