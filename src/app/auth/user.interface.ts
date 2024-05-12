import { UserPerfil } from "./user-perfil.enum";

export interface User {
    id: number;
    nome: string;
    email: string;
    perfil: string;
    salario: string;
}