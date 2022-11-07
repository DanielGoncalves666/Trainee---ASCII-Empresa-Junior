const http = require("http");
// realiza a importação

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    if(request.url === '/produto'){
        response.end(JSON.stringify({
            message: "Rota de Produto"
        }))
    }

    if(request.url === '/usuario'){
        response.end(JSON.stringify({
            message: "Rota de Usuario"
        }))
    }
    
    // se não encontrar a rota, o browser fica em loop infinito.
    
    response.end(JSON.stringify({
         message: "Qualquer outra rota."
    })); // serve como default
}).listen(4001, () => console.log("Servidor está rodando na porta 4001"));

// createServer --> cria um servidor http
// listen --> escuta na porta especificada (por requisições) e executa a função passada.
    // localhost:4001 --> no browser, para ver  

// JSON.stringify() --> cria um json com aquilo passado
