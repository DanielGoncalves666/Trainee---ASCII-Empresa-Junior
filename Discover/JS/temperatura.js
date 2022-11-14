
function conversao(degree){
    const celsiusExists = degree.toUpperCase().includes('C');
    const fahrenheitExists = degree.toUpperCase().includes('F');

    if(!celsiusExists && !fahrenheitExists)
        throw new Error('Grau não identificado');
    else if(celsiusExists)
        CparaF(Number(degree.toUpperCase().replace("C","")));
    else
        FparaC(Number(degree.toUpperCase().replace("F","")));
}

function CparaF(temp){
    let F = temp * 9/5 + 32;

    console.log(`${temp}ºC === ${F}ºF`);
}

function FparaC(temp){
    let C = (temp - 32) * 5/9;

    console.log(`${temp}ºF === ${C}ºC`)
}


try{
    conversao('50F');
    conversao('50Z');
} catch(error){
    console.log(error)
}