import './configure';
import env from '../util/env/env';
import type ms from 'ms';
import { genSecret } from '../util/crypto/genSecret';
import getIpAddress from '../util/server/getIpAddress';

const ip_address = env('ip address', '0.0.0.0');
const port = Number(env('port', process.env.PORT || 3005));
const href = env('href', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://api.campuscouch.com`);
const name = env('name', 'Campus Couch');
const email = env('email user', 'admin@gmail.com');

/**
 * Configuration object for the application
 *
 * This object contains various configuration settings for the application,
 * including server details, database connection, allowed origins, and authentication settings.
 */
const config = {
  server: {
    developer: env('developer', 'Shaishab Chandra Shil'),
    node_env: env('node env', process.env.NODE_ENV || 'production'),
    ip_address,
    port,
    href,
    name,
    logo: env('logo', '/images/logo.png'),
    default_avatar: env('default avatar', '/images/placeholder.png'),
  },
  url: {
    database: env('database url', process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${name.toLowerCase().replace(' ', '-')}`),
    payment: {
      success: env('payment success url', `${href}/payment/success`),
      cancel: env('payment cancel url', `${href}/payment/cancel`),
    },
  },
  allowed_origins: env('allowed origins', [
    'https://campuscouch.com',
    'https://www.campuscouch.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ]),
  bcrypt_salt_rounds: env('bcrypt salt rounds', 10),
  auth: {
    apple: {
      client: env('apple client id', ''),
    },
  },
  jwt: {
    access_token: {
      secret: env('jwt access secret', process.env.JWT_ACCESS_SECRET || genSecret()),
      expire_in: env<ms.StringValue>('jwt access expire in', '1d'),
    },
    refresh_token: {
      secret: env('jwt refresh secret', genSecret()),
      expire_in: env<ms.StringValue>('jwt refresh expire in', '30d'),
    },
  },
  payment: {
    stripe: {
      secret: env('stripe secret', 'enter your stripe secret'),
      webhook: env('stripe webhook', 'enter your stripe webhook'),
    },
    methods: env<[string, ...string[]]>('payment methods', ['card']),
  },
  email: {
    user: email,
    from: `${name} <${email}>`,
    port: env('email port', 587),
    host: env('email host', 'smtp.gmail.com'),
    pass: env('email pass', ''),
  },
  admin: {
    name: env('admin name', 'Mr. Admin'),
    email: env('admin email', email),
    password: env('admin password', genSecret(4)),
  },
};

export default config;
