import dotenv from 'dotenv';

const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
console.log(`Loading environment from: ${path}`);
dotenv.config({ path });
