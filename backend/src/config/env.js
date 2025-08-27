// src/config/env.js
const Joi = require('joi');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

/**
 * @description Joi schema for validating environment variables.
 * @type {Joi.ObjectSchema}
 */
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8080),
  MONGO_URI: Joi.string().required().description('MongoDB URI is required.'),
  REDIS_URI: Joi.string().required().description('Redis URI is required.'),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CHAPA_SECRET_KEY: Joi.string().required(),
  TELEBIRR_CLIENT_ID: Joi.string().required(),
  TELEBIRR_APP_KEY: Joi.string().required(),
  TELEBIRR_SHORTCODE: Joi.string().required(),
  TELEBIRR_PUBLIC_KEY: Joi.string().required(),
  CITY_CENTER_LAT: Joi.number().required(),
  CITY_CENTER_LNG: Joi.number().required(),
  DELIVERY_FEE_BASE: Joi.number().required(),
  DELIVERY_FEE_PER_KM: Joi.number().required(),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly').default('info'),
  ALLOWED_ORIGINS: Joi.string().required().description('Comma-separated list of allowed CORS origins.'),
  PAYOUT_THRESHOLD_ETB: Joi.number().default(500)
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  redis: {
    url: envVars.REDIS_URI,
  },
  firebase: {
    projectId: envVars.FIREBASE_PROJECT_ID,
    privateKey: envVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle key with newline characters
    clientEmail: envVars.FIREBASE_CLIENT_EMAIL
  },
  cloudinary: {
    cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_API_SECRET
  },
  chapa: {
    secretKey: envVars.CHAPA_SECRET_KEY
  },
  telebirr: {
    clientId: envVars.TELEBIRR_CLIENT_ID,
    appKey: envVars.TELEBIRR_APP_KEY,
    shortcode: envVars.TELEBIRR_SHORTCODE,
    publicKey: envVars.TELEBIRR_PUBLIC_KEY
  },
  geo: {
    cityCenter: {
      lat: envVars.CITY_CENTER_LAT,
      lng: envVars.CITY_CENTER_LNG
    },
    deliveryFee: {
      base: envVars.DELIVERY_FEE_BASE,
      perKm: envVars.DELIVERY_FEE_PER_KM
    }
  },
  logLevel: envVars.LOG_LEVEL,
  cors: {
    allowedOrigins: envVars.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  },
  payouts: {
    threshold: envVars.PAYOUT_THRESHOLD_ETB
  }
};
