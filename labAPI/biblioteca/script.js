class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = true;
    this.emprestimos = 0;
  }

  emprestar() {
    if (this.disponivel) {
      this.disponivel = false;
      this.emprestimos += 1;
    }
  }

  devolver() {
    this.disponivel = true;
  }
}

class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionarLivro(titulo, autor) {
    const novoLivro = new Livro(titulo, autor);
    this.livros.push(novoLivro);
  }

  listarLivrosDisponiveis() {
    return this.livros.filter((livro) => livro.disponivel);
  }

  listarTitulosEmprestados() {
    return this.livros
      .filter((livro) => !livro.disponivel)
      .map((livro) => livro.titulo);
  }

  calcularTotalEmprestimos() {
    return this.livros.reduce((total, livro) => total + livro.emprestimos, 0);
  }
}

const biblioteca = new Biblioteca();

function atualizarResultado(mensagem) {
  document.querySelector("#resultado").innerHTML = mensagem;
}

document.querySelector("#adicionar").addEventListener("click", () => {
  const titulo = document.querySelector("#titulo").value;
  const autor = document.querySelector("#autor").value;

  if (titulo && autor) {
    biblioteca.adicionarLivro(titulo, autor);
    atualizarResultado(`Livro "${titulo}" adicionado com sucesso!`);
  } else {
    atualizarResultado("Preencha todos os campos!");
  }
});

document.querySelector("#listar-disponiveis").addEventListener("click", () => {
  const disponiveis = biblioteca.listarLivrosDisponiveis();

  if (disponiveis.length > 0) {
    const resposta = disponiveis
      .map((livro) => `<p>${livro.titulo} - ${livro.autor}</p>`)
      .join("");
    atualizarResultado(`Livros disponíveis:<br>${resposta}`);
  } else {
    atualizarResultado("Nenhum livro disponível.");
  }
});

document.querySelector("#listar-emprestados").addEventListener("click", () => {
  const emprestados = biblioteca.listarTitulosEmprestados();

  if (emprestados.length > 0) {
    const resposta = emprestados.map((titulo) => `<p>${titulo}</p>`).join("");
    atualizarResultado(`Livros emprestados:<br>${resposta}`);
  } else {
    atualizarResultado("Nenhum livro emprestado.");
  }
});

document.querySelector("#calcular-emprestimos").addEventListener("click", () => {
  const total = biblioteca.calcularTotalEmprestimos();
  atualizarResultado(`Total de empréstimos: ${total}`);
});
