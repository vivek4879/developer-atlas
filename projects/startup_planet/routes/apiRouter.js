import express from 'express';
import getAllDataHandler from '../handlers/getAllData.js'
import getDataByParams from '../handlers/getDataByParams.js'



export const apiRouter = express.Router();

apiRouter.get('/', getAllDataHandler);

apiRouter.get('/:category/:type', getDataByParams);