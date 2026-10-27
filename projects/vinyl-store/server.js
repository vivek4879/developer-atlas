import express from 'express';


const PORT = 8000;

const app = Express();

app.use(express.static('public'));



app.listen(PORT, () =>{
    console.log(`listening on Port ${PORT}`)
})

