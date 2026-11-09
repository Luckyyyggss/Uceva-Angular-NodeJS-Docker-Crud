import { Router } from "express";
import { CourseRoutes } from "./modules/course/course.route";
import { StudentRoutes } from "./modules/student/student.routes";
import { HorarioRoutes } from './modules/horarios/horario.routes';
import { GradeRoutes } from "./modules/calificaciones/calificaciones.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    // Definir rutas
    apiRouter.use("/students", StudentRoutes.routes);
    apiRouter.use("/courses", CourseRoutes.routes);
    apiRouter.use("/calificaciones", GradeRoutes.routes);

    router.use("/api", apiRouter);
    router.use('/api/horarios', HorarioRoutes.routes);

    return router;
  }
}