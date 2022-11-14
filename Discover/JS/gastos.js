let balanço = {
    receitas: [200, 1200, 600],
    despesas: [1200, 100, 800]
};

function calcularSaldo(carteira){
    let somaR = 0;
    let somaD = 0;

    for(let valor of carteira.receitas){
        somaR += valor;
    }

    for(let valor of carteira.despesas){
        somaD += valor;
    }

    if(somaR - somaD >= 0.0)
        console.log(`A família está com saldo positivo de ${somaR - somaD}`);
    else
        console.log(`A família está com saldo negativo de ${somaR - somaD}`);
}

calcularSaldo(balanço);