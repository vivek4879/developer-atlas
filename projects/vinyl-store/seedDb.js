import { getDbConnection } from './db/db.js';
import {vinyl} from './data.js';


async function seedDb(){
    let db;
    try{
        db = await getDbConnection();
        const { count } = await db.get('SELECT COUNT(*) AS count FROM products');
        if (count > 0) {
            console.log('Products already seeded, skipping.');
            return;
        }
        await db.exec('BEGIN TRANSACTION')

        for(const {title, artist,price,image, year,genre,stock} of vinyl){
            await db.run(`INSERT INTO products
                (title, artist,price,image, year,genre,stock)
                VALUES (?,?,?,?,?,?,?)`,[title, artist,price,image, year,genre,stock]);
        }

        await db.exec('COMMIT');
        console.log('All records inserted successfully.')
    }catch(err){
        console.error('Error inserting data:', err.message)
        await db?.exec("ROLLBACK").catch(() => {});
        process.exitCode = 1;
    }finally{
        await db?.close();
        console.log('Database connection closed.')
    }
}

seedDb();






