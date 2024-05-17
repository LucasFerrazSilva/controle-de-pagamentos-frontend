import { User } from "src/app/auth/user.interface";
import { NotificacaoStatus } from "./notificacao-status.enum";

export interface Notificacao {
    id: number;
    userDTO: User;
    descricao: string;
    path: string;
    status: NotificacaoStatus
}