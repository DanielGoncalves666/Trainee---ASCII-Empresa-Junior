const { response } = require("express");
const express = require("express");
// estamos importando o express dentro da variável de mesmo nome
const { uuid, isUuid } = require("uuidv4");
    // id único universal

const app = express();

// por padrão o express não interpreta o que a gente vai mandar pra ele por meio de JSON. Podemos falar pra api que vamos receber json assim:
app.use(express.json());

const projects = []; 

// middleware
// mostra quais rotas estão sendo chamadas e com quais métodos
function logRequests(request, response, next){
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}

function validateProjectId(request, response, next){
    const {id} = request.params;

    if(! isUuid(id)){
        return response.status(400).json({ error: "Invalid project ID."});
    }// impede que a rota seja executada

    return next();
} 

// app.get("/projects", logRequests,(request,response) => { .......
// é outra forma de usar os middlwares
app.use(logRequests);

// adiciona nas rotas com o formato dado
//app.use("/projects/:id", validateProjectId;

/* endereço que queremos observar ( apenas o / é a mesma coisa que localhost:porta)
 * tudo que vem depois do barra é chamado de recurso
 * função, que recebe dois parâmetros, requisição e resposta
*/
app.get("/projects", (request,response) => {
    
    return response.json(projects);
});
/* toda retorno de um rota precisa usar o response
 * send pode retornar texto, mas é comum retornar json
 * ja o método json elimina a necessidade de usar JSON.stringify
*/

// -----------------------------
/*
    Rotas do tipo POST, PUT e DELETE não podem ser testadas pelo navegador. Usamos uma ferramenta auxiliar para isso, o INSOMNIA)
*/
app.post("/projects", (request,response) => {
    const {title, owner} = request.body;

    const project = { id: uuid(), title, owner};
    
    projects.push(project);
    
    return response.json(project); // exibimos o objeto criado, não todo o array
});

/*
    O : antes de id indica que um parâmetro vem em sequencia
*/
app.put("/projects/:id", validateProjectId, (request,response) => {
    
    const {id} = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex( project => project.id === id);

    if( projectIndex < 0){
        return response.status(400).json({ error: "Project not found." });
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);

});
// status nos permite forçar o retorno de um HTTP code

app.delete("/projects/:id", validateProjectId, (request,response) => {
    
    const {id} = request.params;

    const projectIndex = projects.findIndex( project => project.id === id);

    if( projectIndex < 0){
        return response.status(400).json({ error: "Project not found." });
    }

    projects.splice(projectIndex,1);
    
    
    return response.status(204).send(); // retornamos em branco
});
// quando retornamos uma mensagem vazio é recomendado mandar status 204


/* Como acessar a aplicação por meio do navegador? Precisamos escutar uma porta.
 * localhost:porta --> portas acima de 80
*/
app.listen(3333, () => {
    console.log("Backend started!");
});
/* a aplicação está escutando na porta 3333
 * primeiro argumento é a porta
 * segundo argumento, opcional, é uma função que é disparada quando o servidor é subido
*/ 