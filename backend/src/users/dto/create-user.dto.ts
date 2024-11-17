export class CreateUserDto {
    email: string;
    password: string;
    userType: keyof typeof UserType;
    cnpj?: string;
    cpf?: string;
}
