const xhttp = new XMLHttpRequest();

const listaFilmes = (dados) => {
    return dados.map(dado => `<li>${dado}</li>`).join('');
};

const títulosSemelhantes = (dados, titulos_s) => {
    return titulos_s.map(dado => {
        if ((dado - 1) in dados) {
            return `<li>${dados[dado - 1].titulo}</li>`;
        }
        return '';
    }).join('');
};

const adicionarFilmeDOM = ({ figura, titulo, generos, elenco, classificacao, resumo, titulosSemelhantes, opinioes }, filmes) => {
    const cardGenero = listaFilmes(generos);
    const cardElenco = listaFilmes(elenco);

    const classIndicativa = classificacao <= 14 ? "classe-kid" :
                            classificacao <= 17 ? "classe-teen" : "classe-adult";

    const filmeApresentacao = `
        <div class="img-container">
            <img src="${figura}" alt="Imagem do filme ${titulo}">
            <div class="card_infos">
                <h4 class="nome">${titulo}</h4>
                <p class="faixa-etaria ${classIndicativa}">Recomendado para ${classificacao} anos</p>
                <div class="generos-lista">
                    <ul>${cardGenero}</ul>
                </div>
                <div class="resumo">
                    <div class="atores">Elenco:<ul>${cardElenco}</ul></div>
                    <div>
                        <p class="descricao-final">Descrição:</p><br/>${resumo}<br/>
                    </div>
                    <ul class="titulos_semelhantes">Títulos semelhantes:${títulosSemelhantes(filmes, titulosSemelhantes)}</ul>
                </div>
            </div>
        </div>`;

    const filmeOpnioes = opinioes.map(opiniao => {
        const filmeNotas = '<img src="./imagens/estrela.png">'.repeat(opiniao.rating);
        const filmeComentarios = `<div class='comentario'>${opiniao.descricao}</div>`;
        return `
            <div class="opiniao">
                Nota: ${opiniao.rating}<br>
                Comentário: ${filmeComentarios}<br>
            </div>`;
    }).join('');

    return `<div class="card-item">${filmeApresentacao}<div class="opinioes">${filmeOpnioes}</div></div>`;
};

function filmeCatalogo() {
    const url_filmes = 'https://rafaelescalfoni.github.io/desenv_web/filmes.json';
    
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const filmes = JSON.parse(this.response);
                document.querySelector("#catalogo").innerHTML = filmes.map(filme => 
                    adicionarFilmeDOM(filme, filmes)
                ).join('');
            } else {
                alert("Erro na requisição");
            }
        }
    };

    xhttp.open("GET", url_filmes);
    xhttp.send();
}

filmeCatalogo();
