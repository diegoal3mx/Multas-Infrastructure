import { Request, Response } from "express"
import { MultaModel } from "../../../data/models/multa.model"

export class MultasController{
  public getMultas = async (req: Request, res:Response) => {
    try {
      const multas = await MultaModel.find()
      return res.json(multas);
    } catch (error){
      return res.json([]);
    }
  };

  public getLatestMultas = async (req:Request, res:Response) =>{
    try {
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate()-7)
      const latestMultas = await MultaModel.find({creationDate:{$gte: lastWeek}})
      return res.json(latestMultas)
    } catch(error){
      return res.json([]);
    }
  }

  public getMultaById = async (req: Request, res:Response) => {
    try {
      const {id} = req.params;
      const multaById = await MultaModel.findById(id);
      
      if(!multaById){
        return res.json({message: "No se econtró una multa con el id especificado"})
      }

      return res.json(multaById)

    } catch (error){
      return res.json({message: "Ocurrió un error al buscar la multa por id"});
    }
  }

  public createMulta = async (req:Request, res:Response) =>{
    try {
      const { plate, city, state, speed, limit, lat, lng } = req.body;
      const newMulta = await MultaModel.create({
        plate,
        city,
        state,
        speed,
        limit,
        lat,
        lng
      });
      res.json(newMulta);
    } catch(error){
      return res.json({message: "Ocurrió un error al crear una multa"})
    }
  }

  public updateMulta = async (req:Request, res:Response) => {
    try{
      const {id} = req.params;
      const multaToUpdate = await MultaModel.findById(id)

      if(!multaToUpdate){
        return res.json({message: "No se encontró una multa con el id especificado"})
      }

      const { plate, city, state, speed, limit, lat, lng } = req.body;

      await MultaModel.findByIdAndUpdate(id,{
        plate:plate,
        city:city,
        state:state,
        speed:speed,
        limit:limit,
        lat:lat,
        lng:lng
      })

      const updatedMulta = await MultaModel.findById(id);
      return res.json(updatedMulta);
    }catch(error){
      return res.json({message: "Ocurrió un error al actualizar la multa",error})
    }
  }
  
  public deleteMulta = async (req:Request, res:Response) => {
    try{
      const {id} = req.params;
      const multaToDelete = await MultaModel.findById(id)

      if(!multaToDelete){
        return res.json({message: "No se encontró una multa con el id especificado"})
      }

      await MultaModel.findByIdAndDelete(id);
      return res.json({message: "Multa eliminada correctamente"})
    }catch(error){
      return res.json({message: "Ocurrió un error al eliminar la multa",error})
    }
  }
}
