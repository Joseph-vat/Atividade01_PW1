// preciso fazer isso para extender o objeto request do xpress e conseguir acessar o campo user em todo o meu código

declare namespace Express {
    export interface Request {
        user: User;
    }
    type User = {
        id: string;
        name: string;
        username: string;
        technologies: technologies[];
    }

}