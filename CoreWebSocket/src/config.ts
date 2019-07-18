import dotenv from 'dotenv';
dotenv.config();

export const port = parseInt(process.env.DEV_APP_PORT);