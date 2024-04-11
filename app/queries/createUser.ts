'use server'
import { sql } from '@vercel/postgres';

export async function createUser(name: string, email: string){
    const createUserQuery = await sql`INSERT INTO users (name, email) VALUES (${name}, ${email})`;
    return createUserQuery;
}