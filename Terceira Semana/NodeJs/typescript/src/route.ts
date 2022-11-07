import {Request, Response} from "express"; // importa os tipos
import createUser from './services/createUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: "danielgoncalveskd@gmail.com",
        password: "32123",
    });

    return response.json({message: "Hello World"});
}