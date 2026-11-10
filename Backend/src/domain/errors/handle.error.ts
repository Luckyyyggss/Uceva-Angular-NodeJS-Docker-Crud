import { Response } from "express";
import { CustomError } from "./custom.error";

/**
 * Manejador centralizado de errores HTTP.
 *
 * @remarks
 * Esta clase se encarga de procesar errores lanzados durante
 * la ejecución de la aplicación y de enviar una respuesta HTTP
 * estandarizada al cliente.
 *
 * Soporta errores personalizados (`CustomError`) y errores
 * genéricos no controlados.
 */
export class HandleError {

  /**
   * Procesa un error y envía la respuesta HTTP correspondiente.
   *
   * @param error Error capturado durante la ejecución
   * @param res Objeto de respuesta de Express
   *
   * @returns Respuesta HTTP con el código de estado y mensaje apropiado
   *
   * @example
   * ```ts
   * try {
   *   ...
   * } catch (error) {
   *   HandleError.error(error, res);
   * }
   * ```
   */
  static error(error: unknown, res: Response) {
    console.log(`${error}`);

    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ error: error.message });
    }

    // Violación de restricción UNIQUE en PostgreSQL (ej. nombre de curso repetido)
    if (typeof error === 'object' && error !== null && (error as { code?: string }).code === '23505') {
      return res
        .status(409)
        .json({ error: 'Ya existe un registro con esos datos (valor duplicado)' });
    }

    return res
      .status(500)
      .json({ error: 'Internal Server error' });
  }
}
