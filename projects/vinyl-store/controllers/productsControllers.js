import { getDbConnection } from '../db/db.js'


export async function getGenres(req,res){
    
    let query = 'SELECT DISTINCT genre FROM products'
    let db;
    try{
        db = await getDbConnection();
        const rows = await db.all(query);
        const newRows = rows.map(row =>{
            return row.genre;
        })
        return res.status(200).json(newRows);
    }catch(e){
        res.status(500).json({error:'Failed to fetch genres', details:e.message});
    }finally{
        await db?.close();
    }
}


export async function getProducts(req,res){
    const {genre, search} = req.query;
    let db;
    let query = 'SELECT * FROM products';
    let params = [];
    try{
        db = await getDbConnection();
        if(genre){
            query += ' WHERE genre = ? '
            params.push(genre);
        }else if(search){
            query += ' WHERE genre LIKE ? OR artist LIKE ? OR title LIKE ?';
            const searchPattern = `%${search}%`
            params.push(searchPattern,searchPattern,searchPattern)
        }
        const rows = await db.all(query,params);
        res.status(200).json(rows);
    }catch(e){
        res.status(500).json({error:'Failed to fetch', message:e.message});
    }finally{
        await db?.close();
    }
}