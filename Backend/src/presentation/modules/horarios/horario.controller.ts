import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { HorarioService } from "./horario.service";
import { CreateHorarioDTO } from "../../../domain/dtos/create-horario.dto";
import { UpdateHorarioDTO } from "../../../domain/dtos/update-horario.dto";

export class HorarioController{
    private readonly horarioService = new HorarioService();

    getAllHorarios = (req: Request, res: Response): void => {
        this.horarioService.getAllHorarios()
        .then((horarios) => res.status(200).json(horarios))
        .catch((error) => HandleError.error(error, res));
    };

    getHorarioById = (req: Request, res: Response): void => {
        const id = Number(req.params.id);
        this.horarioService.getHorarioById(id)
        .then((horario) => res.status(200).json(horario))
        .catch((error) => HandleError.error(error, res));
    }

    createHorario = (req: Request, res: Response) => {
        const [error, createHorarioDTO] = CreateHorarioDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        
        this.horarioService.createHorario(createHorarioDTO!)
        .then((horario) => res.status(201).json(horario))
        .catch((error) => HandleError.error(error, res));
    };

    updateHorario = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateHorarioDTO] = UpdateHorarioDTO.create(req.body);
        if (error) return res.status(400).json({ error });
        
        this.horarioService.updateHorario(id, updateHorarioDTO!)
        .then((horario) => res.status(200).json(horario))
        .catch((error) => HandleError.error(error, res));
    };

    deleteHorario = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        this.horarioService.deleteHorario(id)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => HandleError.error(error, res));
    };
}

