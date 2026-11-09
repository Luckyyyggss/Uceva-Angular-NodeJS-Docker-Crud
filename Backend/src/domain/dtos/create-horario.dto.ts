export class CreateHorarioDTO {
    private constructor(
        public readonly dia: string,
        public readonly hora_inicio: string,
        public readonly hora_fin: string,
        public readonly asignatura: string
    ) {}

    static create(object: { [key: string]: any }): [string | undefined, CreateHorarioDTO?] {
        const { dia, hora_inicio, hora_fin, asignatura } = object;

        if (!dia) return ["Missing dia"];
        if (!hora_inicio) return ["Missing hora_inicio"];
        if (!hora_fin) return ["Missing hora_fin"];
        if (!asignatura) return ["Missing asignatura"];

        return [
            undefined,
            new CreateHorarioDTO(dia, hora_inicio, hora_fin, asignatura)
        ];
    }
}