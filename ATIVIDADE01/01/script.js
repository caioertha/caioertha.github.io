async function converterMoeda() {
    const valor = parseFloat(document.getElementById("valor").value);
    const moedaInicial = document.getElementById("moedaInicial").value.toUpperCase();
    const moedaDestino = document.getElementById("moedaDestino").value.toUpperCase();
    
    if (isNaN(valor) || !moedaInicial || !moedaDestino) {
        document.getElementById("moedaResultado").innerText = "Por favor, preencha corretamente.";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${moedaInicial}`);
        if (!response.ok) throw new Error("Erro ao acessar a API");
        
        const data = await response.json();
        const taxa = data.rates[moedaDestino];

        if (!taxa) {
            document.getElementById("moedaResultado").innerText = `Moeda de destino (${moedaDestino}) não encontrada.`;
            return;
        }

        const resultado = valor * taxa;
        document.getElementById("moedaResultado").innerText = `${valor} ${moedaInicial} = ${resultado.toFixed(2)} ${moedaDestino}`;
    } catch (error) {
        document.getElementById("moedaResultado").innerText = "Erro ao realizar a conversão. Verifique se as moedas estão corretas.";
    }
}
