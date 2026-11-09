import { pool } from "../../../config/database"; // Ajusta la ruta a tu archivo db
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateHorario, UpdateHorario, Horario } from "../../../domain/interfaces/horario.interface";

export class HorarioService {
    
    async getAllHorarios(): Promise<Horario[]> {
        const result = await pool.query('SELECT * FROM horarios');
        return result.rows;
    }

    async getHorarioById(id: number): Promise<Horario> {
        const result = await pool.query('SELECT * FROM horarios WHERE id = $1', [id]);
        if (result.rows.length === 0) throw CustomError.notFound(`Horario con id ${id} no encontrado`);
        return result.rows[0];
    }

    async createHorario(data: CreateHorario): Promise<Horario> {
        const result = await pool.query(
            'INSERT INTO horarios (dia, hora_inicio, hora_fin, asignatura) VALUES ($1, $2, $3, $4) RETURNING *',
            [data.dia, data.hora_inicio, data.hora_fin, data.asignatura]
        );
        return result.rows[0];
    }

    async updateHorario(id: number, data: UpdateHorario): Promise<Horario> {
        await this.getHorarioById(id); 
        
        const result = await pool.query(
            'UPDATE horarios SET dia = $1, hora_inicio = $2, hora_fin = $3, asignatura = $4 WHERE id = $5 RETURNING *',
            [data.dia, data.hora_inicio, data.hora_fin, data.asignatura, id]
        );
        return result.rows[0];
    }

    async deleteHorario(id: number): Promise<boolean> {
        await this.getHorarioById(id);
        await pool.query('DELETE FROM horarios WHERE id = $1', [id]);
        return true;
    }
}