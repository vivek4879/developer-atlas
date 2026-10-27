import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/apiRouter.js';

const PORT = 8000;
const app =  express();
app.use(cors());



app.use('/api', apiRouter)

app.use((req,res) =>{
    res.status(404).json({message:"Endpoint not found. Please check the API documentation."});
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });


app.listen(PORT,()=>{
    console.log(`listening on Port ${PORT}`);
})