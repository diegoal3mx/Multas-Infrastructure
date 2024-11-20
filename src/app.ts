import express from 'express'
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from './data/models/init';
import { envs } from './config/envs.plugin';
import { emailJob } from '../domain/jobs/email.job';
import { MultaModel } from './data/models/multa.model';

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () =>
  await MongoDatabase.connect({dbName:"MultasInfrastructure",mongoUrl:envs.MONGO_URL ?? ""}))();
  
  console.log(envs.PORT)

  app.listen(envs.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
    emailJob();
  })
  
  app.post("/",async(req,res)=>{
    const {lat,lng} = req.body
    const newMulta = await MultaModel.create()//MULTA
    res.send("Multa creada")
  })