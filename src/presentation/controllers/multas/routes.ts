import { Router } from "express";
import { MultasController } from "./controller";

export class MultasRoutes{
  static get routes(): Router{
    const router = Router();
    const controller = new MultasController();
    router.get('/', controller.getMultas);
    router.get('/latest', controller.getLatestMultas);
    router.get('/:id', controller.getMultaById);
    router.post("/", controller.createMulta);
    router.put("/:id", controller.updateMulta);
    router.delete("/:id", controller.deleteMulta);
    return router;
  }
}