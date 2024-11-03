// Classe Produto para representar cada item do cardápio
class Produto {
    constructor(id, nome, categoria, img, valorUnitario, quantidade) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.foto = img;
        this.valorUnitario = valorUnitario;
        this.quantidade = quantidade;
    }
}

// Carregamento do cardápio de exemplo
const cardapio = [
    new Produto(1, "Capuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/capuccino.png", 7, 1),
    new Produto(2, "Espresso", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/espresso.png", 4, 1),
    new Produto(3, "Frapuccino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/frapuccino.png", 8, 1),
    new Produto(4, "Chococcino", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chococcino.png", 7, 1),
    new Produto(5, "Chocolate Quente", "Bebidas Quentes", "https://rafaelescalfoni.github.io/desenv_web/img/chocolate_quente.png", 10, 1),
    new Produto(6, "Frapê", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/frape.png", 12, 1),
    new Produto(7, "Suco de Laranja", "Bebidas Frias", "https://rafaelescalfoni.github.io/desenv_web/img/suco_laranja.png", 10, 1),
    new Produto(8, "Açaí", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/acai.png", 12, 1),
    new Produto(9, "Bolo de Laranja", "Doces", "https://rafaelescalfoni.github.io/desenv_web/img/bolo_laranja.png", 8, 1)
];

// Função para buscar produto pelo ID
const pesquisaPorId = (vetor, objId) => vetor.find(item => item.id == objId);

const pedidos = document.querySelector("#pedidos");
const carregarPedidos = lista => {
    pedidos.innerHTML = "";
    lista.forEach(pedido => {
        pedidos.innerHTML += `
            <li id="${pedido.id}">
                <figure>
                    <img src="${pedido.foto}" alt="${pedido.nome}">
                    <figcaption>${pedido.nome} <strong>${pedido.valorUnitario * pedido.quantidade}</strong></figcaption>
                </figure>
            </li>`; 
    });
};

const carregarCardapio = lista => {
    const listaObj = document.querySelector("#cardapio");
    listaObj.innerHTML = ""; // Limpa o cardápio antes de carregar
    lista.forEach(produto => {
        listaObj.innerHTML += `
            <li id="${produto.id}">
                <figure>
                    <img src="${produto.foto}" alt="${produto.nome}">
                    <figcaption>${produto.nome} <strong>${produto.valorUnitario}</strong></figcaption>
                </figure>
            </li>`; 
    });
};

carregarCardapio(cardapio);

const valorTotal = document.querySelector("#valorTotal");
const carregarTotal = lista => {
    const total = lista.reduce((acc, produto) => acc + produto.valorUnitario * produto.quantidade, 0);
    valorTotal.innerHTML = `Total - ${total}`;
};

let cesta = [];

const inserirEmCesta = objeto => {
    const produtoExistente = cesta.find(item => item.id === objeto.id);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        cesta.push({ ...objeto }); // Adiciona uma cópia do objeto para evitar problemas de referência
    }
};

const listaPedidosStorage = () => {
    cardapio.forEach(produto => {
        const pedidoQuantidade = JSON.parse(localStorage.getItem(produto.id));
        if (pedidoQuantidade) {
            produto.quantidade = pedidoQuantidade;
            cesta.push({ ...produto }); // Adiciona cópia para evitar referência direta
        }
    });
};

listaPedidosStorage();
carregarPedidos(cesta);
carregarTotal(cesta);

const item = document.querySelector("#cardapio");
item.addEventListener("click", ev => {
    if (["IMG", "FIGCAPTION", "STRONG"].includes(ev.target.nodeName)) {
        const objId = ev.target.closest("li").id;
        const objeto = pesquisaPorId(cardapio, objId);
        inserirEmCesta(objeto);
        localStorage.setItem(objeto.id, objeto.quantidade);
        carregarPedidos(cesta);
        carregarTotal(cesta);
    }
});
