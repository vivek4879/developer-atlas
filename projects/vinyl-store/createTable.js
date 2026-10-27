
import { getDbConnection } from './db/db.js';

async function createTable(){
    let db;
    db = await getDbConnection();
    const query = `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT NOT NULL, 
                artist TEXT NOT NULL,
                price REAL NOT NULL,
                image TEXT NOT NULL,
                year INTEGER,
                genre TEXT,
                stock INTEGER 
        )`;
    await db.exec(query);
    console.log("Table created");
    await db?.close();
}

createTable();