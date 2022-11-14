
function converterNota(numero){

    if(numero >= 90.0)
        return "A";
    else if(numero >= 80.0)
        return "B";
    else if(numero >= 70.0)
        return "C";
    else if(numero >= 60.0)
        return "D";
    else
        return "F";
}

converterNota(90.0);
converterNota(65.0);
converterNota(75.0);