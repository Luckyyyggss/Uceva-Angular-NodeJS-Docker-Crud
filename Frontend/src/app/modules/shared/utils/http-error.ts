import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extrae un mensaje legible de un error HTTP.
 * El backend responde los errores con el formato `{ error: string }`.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.';
    }
    const backendMessage = error.error?.error;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
  }
  return fallback;
}
