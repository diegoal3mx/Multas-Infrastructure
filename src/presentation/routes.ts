import { Router } from "express";
import { MultasRoutes } from "./controllers/multas/routes";


export class AppRoutes{
  static get routes(): Router{
    const router = Router();
    router.use("/api/multas/",MultasRoutes.routes);
    return router;
  }
}