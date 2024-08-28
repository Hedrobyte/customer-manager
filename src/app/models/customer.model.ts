export interface Customer {
    id?: number;
    name: string;
    cpf: string;
    dateOfBirth: string; // Date em formato ISO 8601
    email: string;
}