import { config } from 'dotenv'

config()

export const BLOG_CSV_PATH = './assets/blogs-original.csv'
export const BASE_HOST = process.env.BASE_HOST || 'https://bloghub.fun'

export const SENTRY_DSN = process.env.SENTRY_DSN || ''

export const FETCH_FEED_TIMEOUT = 60000
export const FETCH_FEED_CONCURRENCY = 10

export const DATABASE_TYPE = process.env.DATABASE_TYPE || 'mysql'
export const DATABASE_NAME = process.env.DATABASE_NAME || 'bloghub'
export const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1'
export const DATABASE_PORT = Number.parseInt(process.env.DATABASE_PORT) || 3306
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root'
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'mysql'

console.log('Database config: ', JSON.stringify({
  DATABASE_TYPE,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
}))

console.log('Sentry dsn', JSON.stringify({SENTRY_DSN}))
