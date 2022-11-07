
// sempre que precisamos definir o formato de um objeto usamos interface
interface TechObject {
    title: string;
    experience: number;
}

// é como a gente define os tipos de um conjunto de informações, geralmente um objeto
interface CreateUserData {
    name?: string; // ? define que é opcional
    email: string;
    password: string;
    techs?: Array<string | TechObject>;
}

// techs: Array<string>; definir tipos de um array com apenas um tipo de dado
// apenas string: string[]


export default function createUser({name, email, password} : CreateUserData){
    const user = {
        name,
        email,
        password,
    };

    return user;
}

// export default function createUser(name: String, email: String, password: String){
//     const user = {
//         name,
//         email,
//         password,
//     };

//     return user;
// }