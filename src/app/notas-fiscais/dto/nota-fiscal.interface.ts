import { User } from "src/app/auth/user.interface";
import { NotasFiscaisStatus } from "./notas-fiscais-status.enum";

export interface NotaFiscal {
    id: number,
    userDTO: User,
    mes: number,
    ano: number,
    valor: number,
    filePath: string,
    status: NotasFiscaisStatus
}