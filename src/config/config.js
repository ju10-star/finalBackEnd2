import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';

export const config = {
  env: environment,

  server: {
    port:
      environment === 'production'
        ? process.env.PORT || 3000
        : process.env.PORT || 8080
  },

  mongo: {
    url: process.env.MONGO_URL
  },

  jwt: {
    secret: process.env.JWT_SECRET
  },

  cookies: {
    secret: process.env.COOKIE_SECRET
  },

  mail: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  },

  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  }
};