import { Router } from "express";
import { HorarioController } from "./horario.controller";

export class HorarioRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new HorarioController();

    router.get("/", controller.getAllHorarios);
    router.get("/:id", controller.getHorarioById);
    router.post("/", controller.createHorario);
    router.put("/:id", controller.updateHorario);
    router.delete("/:id", controller.deleteHorario);

    return router;
  }
}