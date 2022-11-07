const express = require("express");
const {randomUUID} = require("crypto");
const fd = require("fs");

const app = express();
// inicializa o express

// app.get("/primeira-rota", (request, response) => {
//     return response.json({
//         message: "Acessou a primeira rota com nodeman ", });
// });

app.use(express.json());
// middleware 
// informa que um dos formatos que se espera é json

let products = [];
fd.readFile("products.json","utf-8", (err, data) => {
    if(err)
        console.log(err);
    else
        products = JSON.parse(data);
});
// o parse transforma de json pra objeto

/**
 * HTTP
 * 
 * POST => Inserir um dado
 * GET => Buscar um/mais dados (browser só aceita este tipo de requisição)
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para minha aplicação
 * Params => /product/32432434323424
 *      parâmetros de rota, o número
 * Query => fazem parte da rota mas não são obrigatorios
 *      /product?id=fdfddf&value=asasddsads
 */

app.post("/products", (request,response) => {
    // Nome e preço
    const {name,price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

    productFile();

    return response.json(product);
});

// get sempre que se quiser buscar uma informação
app.get("/products", (request, response) => {
    return response.json(products);
});

app.get("/products/:id", (request,response) => {
    const {id} = request.params;
    const product = products.find( (products) => products.id === id);

    return response.json(product);
});

// alterar
app.put("/products/:id", (request, response) => {
    const {id} = request.params;
    const {name,price} = request.body;

    const productIndex = products.findIndex( product => product.id === id);
    products[productIndex] = {
        ...products[productIndex], // pega todas as informações, menos o que é alterado a seguir
        name, 
        price,
    }

    productFile();

    return response.json( {message: "Produto Alterado com sucesso."});
});

app.delete("/products/:id", (request,response) => {
    const {id} = request.params;

    const productIndex = products.findIndex( (product) => product.id === id);
   
    products.splice(productIndex, 1);

    productFile();

    return response.json({message: "Produto removido com sucesso."});
});

function productFile()
{
    fd.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err)
            console.log(err);
        else
            console.log("Produto inserido");
    });
}


app.listen(4002, () => console.log("Servidor está rodando na porta 4002."));