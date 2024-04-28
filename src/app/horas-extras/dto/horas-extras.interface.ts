import { User } from "src/app/auth/user.interface";
import { HorasExtrasStatus } from "./horas-extras-status.enum";

export interface HorasExtras {
    id: number;
    user: User;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    descricao: string;
    aprovador: User;
    status: HorasExtrasStatus
}