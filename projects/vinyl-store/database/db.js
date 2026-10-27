import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function getDbConnection(){

    const path = path.join('database.db');

    return open({
        filename:path,
        driver:sqlite3.Database
    })
}